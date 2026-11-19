"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function ImageLightbox({ image, onClose }: { image: { src: string; alt?: string }; onClose: () => void }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const wasStopped = lenis?.isStopped;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
    };
  }, [lenis]);

  return <dialog ref={ref} aria-label={t("Resort image viewer")} onClose={() => { if (!ref.current?.open) onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); } }}
    data-lenis-prevent
    className="fixed inset-0 m-auto w-[96vw] max-w-6xl rounded-hero border-0 bg-twilight-navy p-4 text-warm-ivory shadow-hero backdrop:bg-black/90 open:flex flex-col gap-3">
    <button ref={closeRef} type="button" onClick={onClose} aria-label={t("Close image viewer")} className="ml-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-antique-gold">
      <X aria-hidden="true" className="h-6 w-6" />
    </button>
    <Image src={image.src} alt={t(image.alt || "Grand Sapphire Resorts")} width={1400} height={900} sizes="95vw" className="max-h-[75dvh] w-full rounded-card object-contain" />
  </dialog>;
}

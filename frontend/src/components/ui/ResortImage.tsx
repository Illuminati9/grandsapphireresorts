"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export function ResortImage({ src, alt, onError, fallbackSrc = "/images/resort/bedroom.jpeg", ...props }: ImageProps & { fallbackSrc?: string }) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);
  const currentSrc = failedSrc === src ? fallbackSrc : src;
  return <Image {...props} src={currentSrc} alt={alt}
    unoptimized={typeof currentSrc === "string" && currentSrc.startsWith("https://")}
    onError={(event) => { setFailedSrc(src); onError?.(event); }} />;
}

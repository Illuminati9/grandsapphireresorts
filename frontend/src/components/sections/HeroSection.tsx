"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BookingButton } from "@/components/ui";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 120]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.08, 1]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -80]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext;
    if (!gl) return;

    function resizeCanvas() {
      if (!canvas || !gl) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        v_texCoord = position * 0.5 + 0.5;
      }
    `;

    const fragmentShaderSource = `
precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = v_texCoord;
  
  vec3 skyColor = vec3(0.05, 0.1, 0.18);
  vec3 glowColor = vec3(0.07, 0.18, 0.13);
  vec3 amberColor = vec3(0.94, 0.66, 0.31) * 0.2;
  
  float mist = sin(uv.x * 2.0 + u_time * 0.2) * cos(uv.y * 3.0 - u_time * 0.15);
  mist += 0.5 * sin(uv.x * 4.0 - u_time * 0.3) * cos(uv.y * 2.0 + u_time * 0.1);
  
  vec3 finalColor = mix(skyColor, glowColor, uv.y + mist * 0.1);
  
  float horizon = 1.0 - smoothstep(0.0, 0.8, abs(uv.y - 0.4 + mist * 0.05));
  finalColor += amberColor * horizon;
  
  float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5));
  finalColor *= vignette;

  gl_FragColor = vec4(finalColor, 1.0);
}
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation = gl.getUniformLocation(program, "u_time");
    const uResolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const startTime = Date.now();

    function render() {
      if (!canvas || !gl) return;
      const currentTime = (Date.now() - startTime) / 1000;
      gl.uniform1f(uTimeLocation, currentTime);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        id="hero-shader-canvas"
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuClhg66ONDmAgn_Edn-CJhUsTTHf5ys_5umEJTksrPgE6gDW5B98Ajea_iAQE9BcIG5qW4rI1LnJhCCqNUVKjCa9Sswy9dAgRDwsg47nZLOrbcK2EKDOnjgxGLeDgoQgQMbNC4WkCxk8cMqgmnMYZKqATFAFeGkB3mtDrTs18JVrMy5-oMm73j_NIEcY4kBrRs_Th683kT6FbLoY3AcczopBpXDw3qRL0oPMR84IETxzwMdQlpEsZ4C41pGilbPj7GbIzIjpacBwjc"
          alt="Grand Sapphire Resort at twilight"
          className="w-full h-full object-cover hero-bg opacity-70 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-twilight-navy/30 hero-overlay" />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-warm-ivory to-transparent z-[1]" aria-hidden="true" />
      <motion.div
        className="relative z-10 text-center px-4 flex flex-col items-center mt-xl will-change-transform"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <h1
          id="hero-title"
          className="font-headline text-headline-lg-mobile md:text-headline-lg text-warm-ivory mb-6 max-w-4xl drop-shadow-lg hero-headline"
        >
          Unwind in Nature, Live in Luxury
        </h1>
        <BookingButton
          variant="booking"
          className="mt-8 shadow-sm hero-cta"
        >
          Book Your Stay
        </BookingButton>
      </motion.div>
    </section>
  );
}
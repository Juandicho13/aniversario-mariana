"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ===============================================================
   IDs de YouTube
   - AMBIENT: All of Me — John Legend  (sonido de fondo)
   - GIFT:    Mi Vida Entera — Morat   (la canción del regalo)
=============================================================== */
export const AMBIENT_VIDEO_ID = "450p7goxZqg";
export const GIFT_VIDEO_ID = "ooCnP_s0K6s";

/** Construye la URL del reproductor embebido de YouTube. */
export function ytEmbedUrl(
  id: string,
  opts: { autoplay?: boolean; loop?: boolean; mute?: boolean } = {}
) {
  const params = new URLSearchParams({
    enablejsapi: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    autoplay: opts.autoplay ? "1" : "0",
    mute: opts.mute ? "1" : "0",
  });
  if (opts.loop) {
    params.set("loop", "1");
    params.set("playlist", id); // necesario para que un solo video se repita
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/** Manda una orden al reproductor embebido (play, pause, volumen...). */
export function ytCommand(
  iframe: HTMLIFrameElement | null,
  func: string,
  args: unknown[] = []
) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*"
  );
}

/* ===============================================================
   CONTEXTO DE MÚSICA AMBIENTE
=============================================================== */

type MusicApi = {
  active: boolean;
  playing: boolean;
  start: () => void;
  toggle: () => void;
  pause: () => void;
  stop: () => void;
};

const MusicContext = createContext<MusicApi | null>(null);

export function useMusic(): MusicApi {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic debe usarse dentro de <MusicProvider>");
  return ctx;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const start = useCallback(() => {
    setActive(true);
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    ytCommand(iframeRef.current, "pauseVideo");
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    setPlaying((prev) => {
      ytCommand(iframeRef.current, prev ? "pauseVideo" : "playVideo");
      return !prev;
    });
  }, []);

  const stop = useCallback(() => {
    ytCommand(iframeRef.current, "pauseVideo");
    setActive(false);
    setPlaying(false);
  }, []);

  const api = useMemo(
    () => ({ active, playing, start, toggle, pause, stop }),
    [active, playing, start, toggle, pause, stop]
  );

  return (
    <MusicContext.Provider value={api}>
      {children}

      <AnimatePresence initial={false}>
        {active ? (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 26, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-4 left-4 z-40 w-[190px] overflow-hidden rounded-xl border-2 border-white/25 bg-black/75 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md"
          >
            <div className="relative aspect-video w-full bg-black">
              <iframe
                ref={iframeRef}
                src={ytEmbedUrl(AMBIENT_VIDEO_ID, { autoplay: true, loop: true })}
                title="Sonido ambiente"
                allow="autoplay; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => {
                  // volumen bajito, como música de fondo
                  window.setTimeout(
                    () => ytCommand(iframeRef.current, "setVolume", [28]),
                    900
                  );
                }}
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="flex items-center justify-between gap-2 px-2 py-1.5">
              <span className="font-comic text-[9px] uppercase tracking-[0.22em] text-white/55">
                sonido ambiente
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Pausar música" : "Reanudar música"}
                  className="grid h-6 w-6 place-items-center rounded-full border border-white/25 text-[10px] text-white/80 transition hover:bg-white/15"
                >
                  {playing ? "❚❚" : "▶"}
                </button>
                <button
                  type="button"
                  onClick={stop}
                  aria-label="Quitar la música"
                  className="grid h-6 w-6 place-items-center rounded-full border border-white/25 text-[10px] text-white/80 transition hover:bg-white/15"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            type="button"
            onClick={start}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-ink/25 bg-ink/85 px-4 py-2 font-comic text-[10px] uppercase tracking-[0.25em] text-paper shadow-lg backdrop-blur transition hover:bg-ink"
          >
            <span className="text-sm leading-none">♪</span>
            música
          </motion.button>
        )}
      </AnimatePresence>
    </MusicContext.Provider>
  );
}
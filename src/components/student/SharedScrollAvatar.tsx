"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { useGetScholarByUsernameQuery } from "@/components/student/StudentApi";

type ScrollTransformer = (value: number) => number;
type MultiTransformer = (values: number[]) => number;

type Props = {
  username: string;
  topAnchor: React.RefObject<HTMLDivElement>; // big circle in hero
  bottomAnchor: React.RefObject<HTMLDivElement>; // small circle in left card
  topSize?: number;
  bottomSize?: number;
  blurDataURL?: string;
  /** height of your fixed navbar (px). Not strictly required now, but kept for completeness */
  viewportOffsetTop?: number;
};

function pageX(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.left + window.scrollX;
}
function pageY(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.top + window.scrollY;
}

export default function SharedScrollAvatar({
  username,
  topAnchor,
  bottomAnchor,
  topSize = 350,
  bottomSize = 192,
  blurDataURL,
  viewportOffsetTop = 0,
}: Props) {
  // Avatar url (cache-busted)
  const { data: scholar } = useGetScholarByUsernameQuery(username);
  const [src, setSrc] = useState("/avatar-fallback.png");

  useEffect(() => {
    if (!scholar) return;
    const raw =
      scholar?.avatar && /^https?:\/\//.test(String(scholar.avatar))
        ? (scholar.avatar as string)
        : "/avatar-fallback.png";
    const sep = raw.includes("?") ? "&" : "?";
    const v = scholar?.audit?.updatedAt
      ? new Date(scholar.audit.updatedAt).getTime()
      : Date.now();
    setSrc(`${raw}${sep}v=${v}`);
  }, [scholar?.avatar, scholar?.audit?.updatedAt]);

  // Measure anchors once (no scroll re-measure for the flight path)
  const startX = useMotionValue(0);
  const startY = useMotionValue(0);
  const endX = useMotionValue(0);
  const endY = useMotionValue(0);

  const [measured, setMeasured] = useState(false);

  useLayoutEffect(() => {
    const compute = () => {
      const t = topAnchor.current;
      const b = bottomAnchor.current;
      if (!t || !b) return;

      const tW = t.clientWidth || topSize;
      const tH = t.clientHeight || topSize;
      const bW = b.clientWidth || bottomSize;
      const bH = b.clientHeight || bottomSize;
      if (!tW || !tH || !bW || !bH) return;

      startX.set(pageX(t) + tW / 2);
      startY.set(pageY(t) + tH / 2);
      endX.set(pageX(b) + bW / 2);
      endY.set(pageY(b) + bH / 2);
      setMeasured(true);
    };

    const id = requestAnimationFrame(compute);
    const ro = new ResizeObserver(() => requestAnimationFrame(compute));
    if (topAnchor.current) ro.observe(topAnchor.current);
    if (bottomAnchor.current) ro.observe(bottomAnchor.current);
    window.addEventListener("resize", compute);

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [
    topAnchor,
    bottomAnchor,
    topSize,
    bottomSize,
    startX,
    startY,
    endX,
    endY,
  ]);

  const { scrollY } = useScroll();
  const progress = useMotionValue(0);

  // Mark shared avatar ready (to fade out local placeholder)
  useLayoutEffect(() => {
    if (!measured) return;
    progress.set(0);
    const id = requestAnimationFrame(() => {
      document.documentElement.setAttribute("data-shared-avatar-ready", "true");
    });
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.removeAttribute("data-shared-avatar-ready");
    };
  }, [measured, progress]);

  useEffect(() => {
    const unsub = scrollY.on("change", (y: number) => {
      const s = startY.get();
      const e = endY.get();
      const total = Math.max(1, Math.abs(e - s));
      // map scroll to 0..1
      const p = (y + window.innerHeight * 0.25 - (s - topSize * 0.5)) / total;
      progress.set(Math.min(1, Math.max(0, p)));
    });
    return () => unsub();
  }, [scrollY, startY, endY, topSize, progress]);

  // Flight transforms (doc space -> viewport)
  const cxRaw = useTransform([startX, endX, progress], (values: number[]) => {
    const [sx, ex, p] = values;
    return sx + (ex - sx) * p;
  });
  const cyRaw = useTransform([startY, endY, progress], (values: number[]) => {
    const [sy, ey, p] = values;
    return sy + (ey - sy) * p;
  });
  const sizeRaw = useTransform(progress, [0, 1], [topSize, bottomSize]);
  // Smoother rotation with more keyframes and gentler angles
  const rotRaw = useTransform(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 15, 25, 25, 15, 0]
  );

  // Smoother spring configuration with higher damping
  const spring = {
    stiffness: 200, // Reduced stiffness for smoother movement
    damping: 40, // Increased damping to reduce oscillation
    bounce: 0, // Removed bounce for smoother transitions
    mass: 1.2, // Added mass to make it feel more substantial
  } as const;
  const cx = useSpring(cxRaw, spring);
  const cyDoc = useSpring(cyRaw, spring);
  const size = useSpring(sizeRaw, spring);
  const rot = useSpring(rotRaw, spring);

  // Convert doc coords -> viewport for the flight phase
  const xFly = useTransform([cx, size], (values: number[]) => {
    const [cxv, s] = values;
    return cxv - s / 2;
  });
  const yFly = useTransform([cyDoc, scrollY, size], (values: number[]) => {
    const [cy, sy, s] = values;
    return cy - sy - s / 2 - (viewportOffsetTop || 0);
  });

  // --- Docking: once progress >= 1, follow the real anchor in viewport space ---
  const xDock = useMotionValue(0);
  const yDock = useMotionValue(0);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const unsub = progress.on("change", (p: number) => setDocked(p >= 0.999));
    return () => unsub();
  }, [progress]);

  useEffect(() => {
    const updateDock = () => {
      const b = bottomAnchor.current;
      if (!b) return;
      const r = b.getBoundingClientRect(); // viewport coords
      xDock.set(r.left + r.width / 2 - bottomSize / 2);
      yDock.set(r.top + r.height / 2 - bottomSize / 2);
    };
    updateDock();
    const unsub = scrollY.on("change", updateDock);
    window.addEventListener("resize", updateDock);
    return () => {
      unsub();
      window.removeEventListener("resize", updateDock);
    };
  }, [bottomAnchor, bottomSize, scrollY, xDock, yDock]);

  // Choose which coordinates to use
  const x = docked ? xDock : xFly;
  const y = docked ? yDock : yFly;

  if (!topAnchor.current || !bottomAnchor.current || !measured) return null;

  return (
    <motion.div
      initial={false}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x,
        y,
        width: size,
        height: size,
        zIndex: 40, // below navbar (z-50) but above other content
        rotateZ: rot,
        // zIndex: 60, // above content; left card is sticky so it will look “attached”
        pointerEvents: "none",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <Image
        src={src}
        alt={scholar?.englishName || scholar?.username || "profile photo"}
        fill
        className="rounded-full object-cover shadow-2xl"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        sizes="(min-width:1024px) 350px, 220px"
        onError={() => setSrc("/avatar-fallback.png")}
        priority
      />
    </motion.div>
  );
}

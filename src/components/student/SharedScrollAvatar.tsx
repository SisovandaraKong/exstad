"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useGetScholarByUsernameQuery } from "@/components/student/StudentApi";

type Props = {
  username: string;
  topAnchor: React.RefObject<HTMLDivElement>;
  bottomAnchor: React.RefObject<HTMLDivElement>;
  topSize?: number;          
  bottomSize?: number;       
  blurDataURL?: string;
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
  // -------- Avatar URL (cache-busted)
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

  // -------- Responsive sizing + mobile offset
  const [vw, setVw] = useState<number>(typeof window === "undefined" ? 1024 : window.innerWidth);
  useLayoutEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 640;

  // smaller on phones
  const topSizePx = isMobile ? Math.min(170, topSize) : topSize;
  const bottomSizePx = isMobile ? Math.min(120, bottomSize) : bottomSize;
  const mobileOffset = isMobile ? 40 : 0; // move image a little down on phones

  // -------- Anchors measurement
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

      const tW = t.clientWidth || topSizePx;
      const tH = t.clientHeight || topSizePx;
      const bW = b.clientWidth || bottomSizePx;
      const bH = b.clientHeight || bottomSizePx;
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
  }, [topAnchor, bottomAnchor, topSizePx, bottomSizePx, startX, startY, endX, endY]);

  // -------- Scroll progress
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);

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
      const p = (y + window.innerHeight * 0.25 - (s - topSizePx * 0.5)) / total;
      progress.set(Math.min(1, Math.max(0, p)));
    });
    return () => unsub();
  }, [scrollY, startY, endY, topSizePx, progress]);

  // -------- Interpolations
  const cxRaw = useTransform([startX, endX, progress], (values) => {
    const [sx, ex, p] = values as number[];
    return sx + (ex - sx) * p;
  });
  const cyRaw = useTransform([startY, endY, progress], (values) => {
    const [sy, ey, p] = values as number[];
    return sy + (ey - sy) * p;
  });
  const sizeRaw = useTransform(progress, [0, 1], [topSizePx, bottomSizePx]);
  const rotRaw = useTransform(progress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 15, 25, 25, 15, 0]);

  // smoother motion
  const spring = { stiffness: 200, damping: 40, bounce: 0, mass: 1.2 } as const;
  const cx = useSpring(cxRaw, spring);
  const cyDoc = useSpring(cyRaw, spring);
  const size = useSpring(sizeRaw, spring);
  const rot = useSpring(rotRaw, spring);

  const xFly = useTransform([cx, size], (values) => {
    const [cxv, s] = values as number[];
    return cxv - s / 2;
  });
  const yFly = useTransform([cyDoc, scrollY, size], (values) => {
    const [cy, sy, s] = values as number[];
    return cy - sy - s / 2 - (viewportOffsetTop || 0) + mobileOffset;
  });

  // -------- Docking
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
      const r = b.getBoundingClientRect();
      xDock.set(r.left + r.width / 2 - bottomSizePx / 2);
      yDock.set(r.top + r.height / 2 - bottomSizePx / 2);
    };
    updateDock();
    const unsub = scrollY.on("change", updateDock);
    window.addEventListener("resize", updateDock);
    return () => {
      unsub();
      window.removeEventListener("resize", updateDock);
    };
  }, [bottomAnchor, bottomSizePx, scrollY, xDock, yDock]);

  const x = docked ? xDock : xFly;
  const y = docked ? yDock : yFly;

  if (!topAnchor.current || !bottomAnchor.current || !measured) return null;

  // -------- Render
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
        zIndex: 40,
        rotateZ: rot,
        pointerEvents: "none",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <Image
        src={src}
        alt={scholar?.englishName || scholar?.username || "profile photo"}
        fill
        className="rounded-full object-cover shadow-2xl object-top"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        sizes="(min-width:1024px) 350px, (min-width:768px) 160px, (min-width:640px) 112px, 60px"
        onError={() => setSrc("/avatar-fallback.png")}
        priority
      />
    </motion.div>
  );
}

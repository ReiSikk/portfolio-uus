"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./custom-cursor.module.css";
import useMousePosition from "../lib/cursorPosition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useViewportSize from "../lib/viewportSize";

gsap.registerPlugin(useGSAP);

interface CustomCursorProps {
  hoveredProject: string | null;
}

export default function CustomCursor({ hoveredProject }: CustomCursorProps) {
  const { x, y } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const textMeasureRef = useRef<HTMLSpanElement>(null);

  // Keep track of current content
  const [cursorText, setCursorText] = useState("");
  const [cursorSize, setCursorSize] = useState({ width: 80, height: 80 });


  // Get viewport size to apply custom cursor only on desktop
  const { width } = useViewportSize();
  const isMobile = width !== undefined && width < 768;
  
  
  // Handle visibility and text content
  useEffect(() => {
    // Don't run effect on mobile
    if (isMobile) return;

    if (hoveredProject) {
      const newText = `Read more on ${hoveredProject}`;
      setCursorText(newText);

      // Measure text size after a brief delay to ensure DOM update
      setTimeout(() => {
        if (textMeasureRef.current) {
          // Get the actual dimensions of the text
          const textRect = textMeasureRef.current.getBoundingClientRect();

          // Add padding around the text
          const paddingX = 16;
          const paddingY = 0;

          // Calculate new cursor size based on text dimensions
          const newWidth = Math.max(textRect.width + paddingX, 80);
          const newHeight = Math.max(textRect.height + paddingY, 80);

          // Animate to the new size
          if (cursorRef.current) {
            gsap.to(cursorRef.current, {
              width: newWidth,
              height: newHeight,
              duration: 0.4,
              ease: "back.out(1.2)",
            });
          }

          setCursorSize({ width: newWidth, height: newHeight });
        }
      }, 50);

      // Make cursor visible
      setIsVisible(true);
    } else {
      // Hide cursor when not hovering
      setIsVisible(false);
      setCursorText("");
      setCursorSize({ width: 80, height: 80 });
    }
  }, [hoveredProject, isMobile]);

  // Handle animations whenever text or visibility changes
  useEffect(() => {
    // Don't run effect on mobile
    if (isMobile || !isVisible || !textRef.current) return;

      gsap.fromTo(
        textRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2,
        }
      );
  }, [cursorText, isVisible, isMobile]);

  // Initial animation for cursor appearance
  useGSAP(() => {
    // Don't run anim on mobile
    if (isMobile || !isVisible || !cursorRef.current) return; 

      gsap.fromTo(
        cursorRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
  }, [isVisible, isMobile]);

  // Don't render cursor on mobile or when not visible
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Invisible element to measure text size */}
      <span
        ref={textMeasureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          fontWeight: 500,
          fontSize: "14px",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        {cursorText}
      </span>

      <div
        ref={cursorRef}
        className={styles.customCursor}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${cursorSize.width}px`,
          height: `${cursorSize.height}px`,
        }}
      >
        <span ref={textRef} className={styles.cursorText}>
          {cursorText}
        </span>
      </div>
    </>
  );
}

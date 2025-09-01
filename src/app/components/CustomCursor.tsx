"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./custom-cursor.module.css";
import useMousePosition from "../lib/cursorPosition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useViewportSize from "../lib/viewportSize";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "@/app/lib/sanity";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface CustomCursorProps {
  hoveredProject: string | null;
  hoveredProjectImage?: SanityImageSource | null;
}

export default function CustomCursor({ hoveredProject, hoveredProjectImage }: CustomCursorProps) {
  const { x, y } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);
  const [initialPositionSet, setInitialPositionSet] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [cursorImage, setCursorImage] = useState<string | null>(null);

  // Store previous position for smooth animation
  const prevPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only make cursor visible after we have valid coordinates
    if (x !== undefined && y !== undefined && x !== 0 && y !== 0) {
      setInitialPositionSet(true);
      prevPosition.current = { x, y };
    }
  }, [x, y]);
  
  useEffect(() => {
    if (hoveredProject && initialPositionSet) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [hoveredProject, initialPositionSet]);

  // Get viewport size to apply custom cursor only on desktop
  const { width } = useViewportSize();
  const isMobile = width !== undefined && width < 768;

  // Get project images
  const getImageUrl = (imageField: SanityImageSource) => {
    if (!imageField) return null;
    try {
      return urlForImage(imageField).url();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return null;
    }
  };

  useEffect(() => {
 
    if (hoveredProjectImage) {
      const imageUrl = getImageUrl(hoveredProjectImage);
      setCursorImage(imageUrl);
    } else {
      setCursorImage(null);
      return
    }
  }, [hoveredProjectImage]);

  // Handle visibility and text content
  useEffect(() => {

    if (isMobile) return;

    if (hoveredProject && initialPositionSet) {
      setIsVisible(true);
    } else {
      setIsVisible(false);

    }
  }, [hoveredProject, isMobile, initialPositionSet]);

    // Smooth cursor animation with GSAP
    useEffect(() => {
      if (!cursorRef.current || !initialPositionSet || !isVisible) return;
      
      // Only animate if position has changed
      if (prevPosition.current.x !== x || prevPosition.current.y !== y) {
        // Animate cursor movement with fromTo for smoother motion
        gsap.to(
          cursorRef.current,
          { 
            left: x, 
            top: y, 
            duration: 0.3, // Lower for faster response, higher for smoother movement
            ease: "power3.inOut", // Try different easing functions
            overwrite: "auto", // Important for handling frequent updates
          }
        );
        
        // Update previous position after animation starts
        prevPosition.current = { x: x || 0, y: y || 0 };
      }
    }, [x, y, initialPositionSet, isVisible]);

  // Handle animations whenever text or visibility changes
  useEffect(() => {
    // Don't run effect on mobile
    if (isMobile || !isVisible) return;

    // Add animation for image if it exists
    if (imageRef.current && cursorImage) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [cursorImage, isVisible, isMobile]);

  // Initial animation for cursor appearance
  useGSAP(() => {
    // Don't run anim on mobile
    if (isMobile || !isVisible || !cursorRef.current) return;

    gsap.fromTo(
      cursorRef.current,
      { scale: 1, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, duration: 1.2, filter: "blur(0px)", ease: "back.out(1.7)" }
    );
  }, [isVisible, isMobile]);

  // Don't render cursor on mobile
  // Don't render cursor if initial position is not set to avoid it rendering at (0,0) on first load when cursor is not moved
  if (isMobile || !initialPositionSet) return null;


  return (
    <>
      <div
        ref={cursorRef}
        className={`${styles.customCursor} ${isVisible ? styles.visible : ""}`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        {cursorImage && (
          <div
            className={styles.cursorImageContainer}
            ref={imageRef}
            style={{
              backgroundImage: `url(${cursorImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}
      </div>
    </>
  );
}

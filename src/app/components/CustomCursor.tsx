'use client'

import { useEffect, useState, useRef } from 'react';
import styles from './custom-cursor.module.css';
import useMousePosition from '../lib/cursorPosition';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  
  // Handle visibility and text content
  useEffect(() => {
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
              ease: "back.out(1.2)"
            });
          }
          
          // Update state for future reference
          setCursorSize({ width: newWidth, height: newHeight });
        }
      }, 50);
      
      // Then make cursor visible
      setIsVisible(true);
      
    } else {
      // Hide cursor when not hovering
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
          setIsVisible(false);
          setCursorText(""); // Clear text when hidden
          setCursorSize({ width: 80, height: 80 }); // Reset size
        }
      });
    }
  }, [hoveredProject]);
  
  // Handle animations whenever text or visibility changes
  useEffect(() => {
    if (isVisible && textRef.current) {
      // Always animate the text when it's visible
      gsap.fromTo(textRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.out",
          delay: 0.2 // Give cursor time to appear first
        }
      );
    }
  }, [cursorText, isVisible]);
  
  // Initial animation for cursor appearance
  useGSAP(() => {
    if (isVisible && cursorRef.current) {
      gsap.fromTo(cursorRef.current, 
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isVisible]);
 
  if (!isVisible) return null;

  return (
    <>
      {/* Invisible element to measure text size */}
      <span 
        ref={textMeasureRef}
        style={{ 
          position: 'absolute', 
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          fontWeight: 500,
          fontSize: '14px',
          letterSpacing: '1px',
          textTransform: 'uppercase'
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
          height: `${cursorSize.height}px`
        }}
      >
        <span ref={textRef} className={styles.cursorText}>
          {cursorText}
        </span>
      </div>
    </>
  );
}
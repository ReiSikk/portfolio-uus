import React from "react";
import styles from "./ShimmeringText.module.css";

type ShimmeringTextProps = {
  text: string;
  duration: number;
  color: string;
  shimmerColor: string;
  spread: number;
};

function ShimmeringText({ text, duration, color, shimmerColor, spread }: ShimmeringTextProps) {
  return (
    <span
      className={`${styles["shimmering-text"]} h4-med`}
      style={{
        color,
        backgroundImage: `linear-gradient(150deg, 
          ${color} 0%, 
          ${color} 10%, 
          ${shimmerColor} 20%, 
          ${shimmerColor} 30%, 
          ${color} 40%, 
          ${color} 50%, 
          ${shimmerColor} 60%, 
          ${shimmerColor} 70%, 
          ${color} 80%, 
          ${color} 90%, 
          ${color} 100%
        )`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: `${text.length * spread}rem ${text.length * spread * 0.5}rem`,
        backgroundPosition: "0% 0%",
        animation: `${styles["shimmering-text__shimmer"]} linear infinite`,
        animationDuration: `${duration}s`
      }}
    >
      {text}
    </span>
  );
}

export default ShimmeringText;


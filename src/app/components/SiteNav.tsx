"use client";

import React, { useRef } from 'react'
import { FaGithub } from 'react-icons/fa'
import styles from '../page.module.css'
import useViewportSize from '../lib/viewportSize';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function SiteNav() {
    const { width } = useViewportSize();
      const navRef = useRef<HTMLElement>(null);

      useGSAP(() => {
        gsap.fromTo(
          navRef.current,
          { y: -20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: navRef.current,
              start: "top 100%",
              toggleActions: "play none none none",
              markers: false,
            },
          }
        );
      })

  
    // You can conditionally render based on viewport size
    const isMobile = width !== undefined && width < 768;

  return (
    <nav className={styles.siteNav} ref={navRef}>
    <ul className={`${styles.siteNavList} fp`}>
      <li>
        <span className="h4-med txt-up">
        {isMobile ? 'Rei Sikk' : 'Rei Sikk - Web Developer'}
        </span>
      </li>
      <li className="fp">
        <a href="https://github.com/ReiSikk" target='_blank' rel="noopener noreferrer">
          <FaGithub size={36} className="img-responsive" />
        </a>
      </li>
    </ul>
  </nav>
  )
}

export default SiteNav
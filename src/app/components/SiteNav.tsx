"use client";

import React from 'react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import styles from '../page.module.css'
import useViewportSize from '../lib/viewportSize';

function SiteNav() {
    const { width } = useViewportSize();
  
    // You can conditionally render based on viewport size
    const isMobile = width !== undefined && width < 768;

  return (
    <nav className={styles.siteNav}>
    <ul className={`${styles.siteNavList} fp`}>
      <li>
        <span className="h4-med txt-up">
        {isMobile ? 'Rei Sikk' : 'Rei Sikk - Web Developer'}
        </span>
      </li>
      <li className="fp">
        <Link href="#about" className="btn btn-small">
          About
        </Link>
        <a href="https://github.com/ReiSikk" target='_blank' rel="noopener noreferrer">
          <FaGithub size={36} className="img-responsive" />
        </a>
      </li>
    </ul>
  </nav>
  )
}

export default SiteNav
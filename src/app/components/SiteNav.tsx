"use client";

import React, { useRef } from "react";
import { FaGithub } from "react-icons/fa";
import styles from "../page.module.css";
import useViewportSize from "../lib/viewportSize";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { T } from "gt-next";
import { LocaleSelector } from 'gt-next/client';


gsap.registerPlugin(useGSAP, ScrollTrigger);

function SiteNav() {
	const { width } = useViewportSize();
	const isMobile = width !== undefined && width < 768;

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
			},
		);
	});

	return (
		<nav className={styles.siteNav} ref={navRef} aria-label="Main Navigation">
			 <LocaleSelector />
			<ul className={`${styles.siteNavList} fp`}>
				<li>
					<span className="h4-med txt-up">
						{isMobile ? (
							<T id="app.components.sitenav.0">{"Rei Sikk"}</T>
						) : (
							<T id="app.components.sitenav.1">{"Rei Sikk - Web Developer"}</T>
						)}
					</span>
				</li>
				<li className="fp">
					<a
						href="https://github.com/ReiSikk"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub size={36} className="img-responsive" />
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default SiteNav;

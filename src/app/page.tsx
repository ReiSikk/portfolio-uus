"use client";

import styles from "./page.module.css";
import {
	Project,
	ServiceItem,
	FooterLink,
	PageContent,
	StackItem,
} from "./types/sanity";
import sanityClient from "./lib/sanity";
import { ArrowUpRight } from "lucide-react";
import ProjectItem from "./components/ProjectItem";
import SiteNav from "./components/SiteNav";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { urlForImage } from "./lib/sanity";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "./components/CustomCursor";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { T, Var } from "gt-next";
import { useGT } from "gt-next/client";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  // Translation hook
  const t = useGT();

	const [hoveredProject, setHoveredProject] = useState<string | null>(null);
	const [hoveredProjectImage, setHoveredProjectImage] =
		useState<SanityImageSource | null>(null);

	// Define a handler for project hover
	const handleProjectHover = (
		projectId: string | null,
		projectImage: SanityImageSource | null,
	) => {
		setHoveredProject(projectId);
		setHoveredProjectImage(projectImage);
	};
	// Refs for the sections that need animation
	const container = useRef(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);
	const servicesRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);
	const aboutTextRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLElement>(null);

	// Use useState for data
	const [projects, setProjects] = useState<Project[]>([]);
	const [pageContent, setPageContent] = useState<PageContent | null>(null);

	//***** Fetch data on component mount *****
	useEffect(() => {
		async function fetchData() {
			const projectQuery = `*[_type == "project"]`;
			const fetchedProjects: Project[] = await sanityClient.fetch(projectQuery);

			const pageQuery = `*[_type == "pageContent"][0]`;
			const fetchedPageContent = await sanityClient.fetch(pageQuery);

			setProjects(fetchedProjects);
			setPageContent(fetchedPageContent);
		}

		fetchData();
	}, []);

	//***** GSAP animations *****/
	useGSAP(
		() => {
			// Only run animations if pageContent exists
			if (pageContent) {
				// Hero content animation - immediate
				if (heroRef.current) {
					const heroElements = heroRef.current;
					gsap.fromTo(
						heroElements,
						{ y: 20, autoAlpha: 0 },
						{
							y: 0,
							autoAlpha: 1,
							duration: 0.5,
							ease: "power2.out",
							clearProps: "all", // Clean up after animation
						},
					);
				}

				// Animate other sections with ScrollTrigger
				[aboutRef, aboutTextRef].forEach((ref) => {
					if (ref.current) {
						gsap.fromTo(
							ref.current,
							{ y: 20, autoAlpha: 0 },
							{
								y: 0,
								autoAlpha: 1,
								duration: 0.8,
								ease: "power2.out",
								scrollTrigger: {
									trigger: ref.current,
									start: "top 80%", // Trigger when top of section reaches 80% down viewport
									toggleActions: "play none none none", // Play animation once when scrolled into view
									markers: false, // Set to true for debugging
								},
								splitText: {
									type: "lines, words, chars",
									linesClass: "line",
									wordsClass: "word",
									charsClass: "char",
								},
							},
						);
					}
				});

				// Animate projects section
				if (projectsRef.current) {
					// 1. First animate the section title
					const projectsTitle = projectsRef.current.querySelector(
						`.${styles.projectsTitle}`,
					);
					if (projectsTitle) {
						gsap.fromTo(
							projectsTitle,
							{ y: 20, autoAlpha: 0 },
							{
								y: 0,
								autoAlpha: 1,
								duration: 0.6,
								ease: "power2.out",
								scrollTrigger: {
									trigger: projectsRef.current,
									start: "top 80%",
									toggleActions: "play none none none",
									markers: false,
								},
							},
						);
					}

					// 2. Then stagger animate the project items
					const projectItems = projectsRef.current.querySelectorAll(
						`.${styles.projectsList} > li`,
					);
					if (projectItems.length) {
						gsap.fromTo(
							projectItems,
							{ y: 20, autoAlpha: 0 },
							{
								y: 0,
								autoAlpha: 1,
								duration: 0.8,
								stagger: 0.15, // Stagger each project item
								ease: "power2.out",
								scrollTrigger: {
									trigger: projectsRef.current,
									start: "top 80%",
									toggleActions: "play none none none",
									markers: false,
								},
							},
						);
					}
				}

				// Animate the services section
				if (servicesRef.current) {
					// 1. Animate the section title first
					const servicesTitle = servicesRef.current.querySelector(
						`.${styles.servicesTitle}`,
					);
					if (servicesTitle) {
						gsap.fromTo(
							servicesTitle,
							{ y: 20, autoAlpha: 0 },
							{
								y: 0,
								autoAlpha: 1,
								duration: 0.8,
								ease: "power2.out",
								scrollTrigger: {
									trigger: servicesRef.current,
									start: "top 80%",
									toggleActions: "play none none none",
									markers: false,
								},
							},
						);
					}

					// 2. Stagger animate the service items
					const serviceItems = servicesRef.current.querySelectorAll(
						`.${styles.servicesList__item}`,
					);
					if (serviceItems.length) {
						gsap.fromTo(
							serviceItems,
							{ y: 20, autoAlpha: 0 },
							{
								y: 0,
								autoAlpha: 1,
								duration: 0.8,
								stagger: 0.4, // Stagger each service item
								ease: "power2.out",
								scrollTrigger: {
									trigger: servicesRef.current,
									start: "top 80%",
									toggleActions: "play none none none",
									markers: false,
								},
							},
						);
					}
				}

				// Footer animations based on main element
				if (footerRef.current) {
					// Get a reference to the main element
					const mainElement = document.querySelector(`.${styles.main}`);

					if (mainElement) {
						// Create a timeline for footer animations
						const footerTimeline = gsap.timeline({
							scrollTrigger: {
								trigger: mainElement, // Use main element as trigger
								start: "bottom 80%", // When bottom of main element is 80% up the viewport
								toggleActions: "play none none none",
								markers: false, // Set to true for debugging
								once: true, // Only trigger once
							},
						});

						// 1. First animate the footer title
						const footerTitle = footerRef.current.querySelector(
							`.${styles.footerTitle}`,
						);
						if (footerTitle) {
							footerTimeline.fromTo(
								footerTitle,
								{ y: 20, autoAlpha: 0 },
								{
									y: 0,
									autoAlpha: 0.6,
									duration: 0.6,
									ease: "power2.out",
								},
							);
						}

						// 2. Create specific targets in the proper order

						// Footer bottom elements first
						const copyright = footerRef.current.querySelector(`.copyright`);
						const footerCredits = footerRef.current.querySelector(
							`.${styles.footerCredits}`,
						);

						// The footer links in reverse order (we need to get them individually)
						const footerLinks = Array.from(
							footerRef.current.querySelectorAll(`.${styles.footerMain} > li`),
						);

						// Animation order: copyright, footerCredits, and all footerLinks from last to first

						// First animate copyright
						if (copyright) {
							footerTimeline.fromTo(
								copyright,
								{ y: 20, autoAlpha: 0 },
								{
									y: 0,
									autoAlpha: 1,
									duration: 0.6,
									ease: "power2.out",
								},
								"-=0.3", // Start slightly before previous animation ends
							);
						}

						// Then animate footerCredits
						if (footerCredits) {
							footerTimeline.fromTo(
								footerCredits,
								{ y: 20, autoAlpha: 0 },
								{
									y: 0,
									autoAlpha: 1,
									duration: 0.6,
									ease: "power2.out",
								},
								"-=0.3", // Start slightly before previous animation ends
							);
						}

						// Animate footer links
						if (footerLinks.length) {
							footerLinks.forEach((link, index) => {
								footerTimeline.fromTo(
									link,
									{ y: 20, autoAlpha: 0 },
									{
										y: 0,
										autoAlpha: 1,
										duration: 0.6,
										ease: "power2.out",
									},
									index === 0 ? "-=0.3" : "-=0.2", // First one overlaps more with previous
								);
							});
						}
					}
				}
			}
		},
		{ scope: container, dependencies: [pageContent] },
	);

	useLayoutEffect(() => {
		// Only run if pageContent exists
		if (!pageContent) return;

		const maskedElements =
			document.querySelectorAll<HTMLElement>(".masked-lines");

		if (maskedElements.length > 0) {
			maskedElements.forEach((element) => {
				// Get the original text
				const text = element.innerHTML;
				// Clear the element content
				element.innerHTML = "";

				// Set words per line based on class
				const wordsPerLine = 3;

				// Check if text contains HTML breaks
				const hasBreaks = text.includes("<br>");

				if (hasBreaks) {
					// Process as multi-line
					const lines = text.split("<br>");

					lines.forEach((line) => {
						// Skip empty lines
						if (line.trim() === "") return;

						// Create container for this line
						const lineEl = document.createElement("div");
						lineEl.classList.add("line");

						// Create element for the text
						const textEl = document.createElement("div");
						textEl.innerHTML = line;

						// Create the mask element
						const maskEl = document.createElement("div");
						maskEl.classList.add("line-mask");

						// Assemble the line
						lineEl.appendChild(textEl);
						lineEl.appendChild(maskEl);
						element.appendChild(lineEl);
					});
				} else {
					// For single-line text, split by spaces or after a certain number of words
					const words = text.split(" ");
					const linesArray: string[] = [];
					let currentLine: string[] = [];

					// Group words into lines (customize this based on your design)
					words.forEach((word) => {
						currentLine.push(word);
						// Create a new line after X words or if word contains line break
						if (currentLine.length === wordsPerLine || word.includes("\n")) {
							linesArray.push(currentLine.join(" "));
							currentLine = [];
						}
					});

					// Add any remaining words
					if (currentLine.length > 0) {
						linesArray.push(currentLine.join(" "));
					}

					// Create elements for each line
					linesArray.forEach((line) => {
						// Create line elements
						const lineEl = document.createElement("div");
						lineEl.classList.add("line");

						const textEl = document.createElement("div");
						textEl.innerHTML = line;

						const maskEl = document.createElement("div");
						maskEl.classList.add("line-mask");

						lineEl.appendChild(textEl);
						lineEl.appendChild(maskEl);
						element.appendChild(lineEl);
					});
				}

				// Create the animation for the line masks
				gsap.to(element.querySelectorAll<HTMLElement>(".line-mask"), {
					scaleY: 0,
					transformOrigin: "top",
					ease: "power2.out",
					stagger: 0.4,
					scrollTrigger: {
						trigger: element,
						start: "top 75%",
						end: "bottom 25%",
						toggleActions: "play none none none",
						duration: 0.6,
					},
				});
			});
		}
	}, [pageContent]); // Re-run when pageContent changes

	// Render loading state if pageContent is not fetched yet
	if (!pageContent) {
		return (
			<T id="app.page.0">
				<div className="loading">
					<span className="h4-med txt-up">Loading...</span>
				</div>
			</T>
		);
	}

	return (
		<T id="app.page.1">
			<div className={`${styles.page}`} ref={container}>
				<CustomCursor
					hoveredProject={hoveredProject}
					hoveredProjectImage={hoveredProjectImage}
				/>
				<header className={`${styles.siteHeader} container`}>
					<SiteNav />
					<div className={styles.hero} ref={heroRef}>
						<h1 className={`${styles.heroTitle} h2`}>
              <Var>
              {pageContent.heroTitle}
              </Var>
						</h1>
						<a
							href="mailto:sikkrei@gmail.com"
							className={`${styles.heroBtn} btn btn-large hoverBtn`}
						>
							<span className="mainTxt">
								<Var>{pageContent.heroBtn}</Var>
							</span>
							<span className="hoverTxt">
								<Var>{pageContent.heroBtn}</Var>
							</span>
						</a>
					</div>
				</header>
				<main className={`${styles.main} container`}>
					<section className={styles.projects} ref={projectsRef}>
						<h2 className={`${styles.projectsTitle} txt-up h4-med`}>
							<Var>{pageContent.projectsTitle}</Var>
						</h2>
						<ul className={styles.projectsList}>
							<Var>
								{projects.map((project) => (
									<ProjectItem
										key={project._id}
										project={project}
										onMouseEnter={() =>
											handleProjectHover(project.title, project.heroImage)
										}
										onMouseLeave={() => handleProjectHover(null, null)}
									/>
								))}
							</Var>
						</ul>
					</section>
					<section className={styles.services} ref={servicesRef}>
						<h3 className={`${styles.servicesTitle} h1-large`}>
							<Var>{pageContent.servicesTitle}</Var>
						</h3>
						<ul className={`${styles.servicesList}`}>
							<li
								className={`${styles.servicesList__item} ${styles.techStack} fp`}
								key={"techStackList"}
							>
								<Var>
									{pageContent.techStackList.map((technology: StackItem) => (
										<div
											key={technology.techTitle}
											className={`${styles.techStack__item} monospace txt-up`}
											style={
												{
													"--hue": `${technology.randomHue}deg`,
												} as React.CSSProperties
											}
										>
											<span className={styles.techItem__title}>
												{technology.techTitle}
											</span>
											{technology.techLogo?.asset._ref && (
												<Image
													src={urlForImage(technology.techLogo).url()}
													alt={technology.techTitle}
													height={64}
													width={64}
													className={`${styles.techLogo} img-responsive`}
												/>
											)}
										</div>
									))}
								</Var>
							</li>
							<Var>
								{pageContent.servicesList.map((service: ServiceItem) => (
									<li
										key={service?.serviceTitle}
										className={`${styles.servicesList__item} fp-col`}
									>
										<h3 className={`${styles.serviceTitle} h3`}>
											{service.serviceTitle}
										</h3>
										<p className={styles.serviceText}>
											{service.serviceDescription}
										</p>
									</li>
								))}
							</Var>
						</ul>
					</section>
					<section className={styles.about} id="about">
						<h4
							className={`${styles.aboutTitle} txt-up h1-jumbo masked-lines`}
							ref={aboutRef}
						>
							<Var>{pageContent.aboutTitle}</Var>
						</h4>
						<p className={`${styles.aboutText} h3`} ref={aboutTextRef}>
							<Var>{pageContent.aboutText}</Var>
						</p>
					</section>
				</main>
				<footer className={styles.footer} ref={footerRef}>
					<div className={`${styles.footerWrap} container`}>
						<h5 className={`${styles.footerTitle} h3`}>
							<Var>{pageContent.footerTitle}</Var>
						</h5>
						<ul className={styles.footerMain}>
							<Var>
								{pageContent.footerLinks.map((link: FooterLink) => (
									<li key={link.text} className={styles.projectsList__item}>
										<a
											href={link.url}
											className="footerLink"
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className={`${styles.trigger} footerLink fp`}>
												<span className="h1-large">{link.text}</span>
												<ArrowUpRight
													size={96}
													strokeWidth={1}
													className={`${styles.triggerIcon} img-responsive`}
												/>
											</div>
										</a>
									</li>
								))}
							</Var>
							<li className={styles.projectsList__item}>
								<a href="mailto:sikkrei@gmail.com" className="footerLink">
									<div className={`${styles.trigger} footerLink fp`}>
										<span className="h1-large">Email me</span>
										<ArrowUpRight
											size={96}
											strokeWidth={1}
											className={`${styles.triggerIcon} img-responsive`}
										/>
									</div>
								</a>
							</li>
						</ul>
						<div className={styles.footerBottom} id="footerBottom">
							<a
								href="https://www.linkedin.com/in/rei-sikk18/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Visit Rei's LinkedIn profile"
								className="txt-up h5-med footerCredits monospace"
							>
								Development & design by Rei Sikk
							</a>
							<p className="copyright monospace">
								&copy; <Var>{new Date().getFullYear()}</Var> All rights reserved
							</p>
						</div>
					</div>
					<div className={styles.blobsContainer}>
						<div className={`${styles.blob} ${styles.blob1}`}></div>
					</div>
				</footer>
			</div>
		</T>
	);
}

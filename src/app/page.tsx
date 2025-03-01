"use client";

import styles from "./page.module.css";
import { Project, ServiceItem, FooterLink, PageContent } from "./types/sanity";
import sanityClient from "./lib/sanity";
import { ArrowUpRight } from "lucide-react";
import ProjectItem from "./components/ProjectItem";
import SiteNav from "./components/SiteNav";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger); // register the hook to avoid React version discrepancies

export default function Home() {
  // const query = `*[_type == "project"]`;
  // const projects: Project[] = await sanityClient.fetch(query);

  // // Query page copy from Sanity
  // const pageQuery = `*[_type == "pageContent"][0]`;
  // const pageContent = await sanityClient.fetch(pageQuery);

  // Create refs for the šections that need animation
  const container = useRef(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  // Use useState for data
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageContent, setPageContent] = useState<PageContent | null>(null);

  // Fetch data on component mount
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

  // GSAP animations
  useGSAP(
    () => {
      // Only run animations if pageContent exists
      if (pageContent) {
        // Hero content animation - immediate
        if (heroRef.current) {
          const heroElements = heroRef.current.children;
          console.log(heroElements);
          gsap.fromTo(
            heroElements,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.2,
              ease: "power2.out",
              clearProps: "all", // Clean up after animation
            }
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
                  start: "top 80%", // Trigger when top of section reaches 75% down viewport
                  toggleActions: "play none none none", // Play animation once when scrolled into view
                  markers: false, // Set to true for debugging
                },
              }
            );
          }
        });

        // Animate projects section
        if (projectsRef.current) {
          // 1. First animate the section title
          const projectsTitle = projectsRef.current.querySelector(`.${styles.projectsTitle}`);
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
              }
            );
          }

          // 2. Then stagger animate the project items
          const projectItems = projectsRef.current.querySelectorAll(`.${styles.projectsList} > li`);
          if (projectItems.length) {
            gsap.fromTo(
              projectItems,
              { y: 30, autoAlpha: 0 },
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
              }
            );
          }
        }

        // Animate the services section
        if (servicesRef.current) {
          // 1. Animate the section title first
          const servicesTitle = servicesRef.current.querySelector(`.${styles.servicesTitle}`);
          if (servicesTitle) {
            gsap.fromTo(
              servicesTitle,
              { y: 30, autoAlpha: 0 },
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
              }
            );
          }

          // 2. Stagger animate the service items
          const serviceItems = servicesRef.current.querySelectorAll(`.${styles.servicesList__item}`);
          if (serviceItems.length) {
            gsap.fromTo(
              serviceItems,
              { y: 30, autoAlpha: 0 },
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
              }
            );
          }
        }
      }
    },
    { scope: container, dependencies: [pageContent] }
  );

  // If data is still loading, show a simple loading state
  if (!pageContent) {
    return (
      <div className="loading">
        <span className="h4-med txt-up">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`${styles.page}`} ref={container}>
      <header className={`${styles.siteHeader} container`}>
        <SiteNav />
        <div className={styles.hero}>
          <h1 className={`${styles.heroTitle} h2`}>{pageContent.heroTitle}</h1>
          <a href="mailto:sikkrei@gmail.com" className={`${styles.heroBtn} btn btn-large`}>
            <span className={styles.mainTxt}>{pageContent.heroBtn}</span>
            <span className={styles.hoverTxt}>{pageContent.heroBtn}</span>
          </a>
        </div>
      </header>
      <main className={`${styles.main} container`}>
        <section className={styles.projects} ref={projectsRef}>
          <h2 className={`${styles.projectsTitle} txt-up h4-med`}>{pageContent.projectsTitle}</h2>
          <ul className={styles.projectsList}>
            {projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </ul>
        </section>
        <section className={styles.services} ref={servicesRef}>
          <h3 className={`${styles.servicesTitle} h1-large`}>{pageContent.servicesTitle}</h3>
          <ul className={`${styles.servicesList} fp-col`}>
            {pageContent.servicesList.map((service: ServiceItem) => (
              <li key={service?.serviceTitle} className={`${styles.servicesList__item} fp-col`}>
                <h3 className={`${styles.serviceTitle} h3`}>{service.serviceTitle}</h3>
                <p className={styles.serviceText}>{service.serviceDescription}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.about} id="about">
          <h4 className={`${styles.aboutTitle} txt-up h1-jumbo`} ref={aboutRef}>
            {pageContent.aboutTitle}
          </h4>
          <p className={`${styles.aboutText} h3`} ref={aboutTextRef}>
            {pageContent.aboutText}
          </p>
        </section>
      </main>
      <footer className={styles.footer} id="footer">
        <div className={`${styles.footerWrap} container`}>
          <h5 className={`${styles.footerTitle} h3`}>{pageContent.footerTitle}</h5>
          <ul className={styles.footerMain}>
            {pageContent.footerLinks.map((link: FooterLink) => (
              <li key={link.text} className={styles.projectsList__item}>
                <a href={link.url} className="footerLink" target="_blank" rel="noopener noreferrer">
                  <div className={`${styles.trigger} footerLink fp`}>
                    <span className="h1-large">{link.text}</span>
                    <ArrowUpRight size={96} strokeWidth={1} className={`${styles.triggerIcon} img-responsive`} />
                  </div>
                </a>
              </li>
            ))}
            <li className={styles.projectsList__item}>
              <a href="mailto:sikkrei@gmail.com" className="footerLink">
                <div className={`${styles.trigger} footerLink fp`}>
                  <span className="h1-large">Email me</span>
                  <ArrowUpRight size={96} strokeWidth={1} className={`${styles.triggerIcon} img-responsive`} />
                </div>
              </a>
            </li>
          </ul>
          <div className={styles.footerBottom}>
            <span className={`${styles.footerCredits} txt-up h5-med`}>Development & design by Rei Sikk</span>
            <p className="h5-med copyright">&copy; {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

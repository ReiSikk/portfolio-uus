import Image from "next/image";
import styles from "./page.module.css";
import { Project } from "./types/sanity";
import sanityClient from "./lib/sanity";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectItem from "./components/ProjectItem";
import { FaGithub } from "react-icons/fa";

export default async function Home() {
  const query = `*[_type == "project"]`;
  const projects: Project[] = await sanityClient.fetch(query);

  // Query page copy from Sanity
  const pageQuery = `*[_type == "pageContent"][0]`;
  const pageContent = await sanityClient.fetch(pageQuery);
  console.log(pageContent);
  console.log(pageContent.footerLinks.map((link: any) => console.log(link.text)));

  return (
    <div className={`${styles.page}`}>
      <header className={`${styles.siteHeader} container`}>
        <nav className={styles.siteNav}>
          <ul className={`${styles.siteNavList} fp`}>
            <li>
              <span className="txt-medium">Rei Sikk - Web Developer & Digital Design</span>
            </li>
            <li className="fp">
              <Link href="#about" className="btn btn-small">
                About
              </Link>
              <a href="/">
                <FaGithub size={36} className="img-responsive" />
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.hero}>
          <h1 className={`${styles.heroTitle} h2`}>
            {pageContent.heroTitle}
          </h1>
          <Link href="#footer" className={`${styles.heroBtn} btn btn-large`}>
          {pageContent.heroBtn}
          </Link>
        </div>
      </header>
      <main className={`${styles.main} container`}>
        <section className={styles.projects}>
          <h2 className={`${styles.projectsTitle} txt-up h4-med`}>
            {pageContent.projectsTitle}
          </h2>
          <ul className={styles.projectsList}>
            {projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </ul>
        </section>
        <section className={styles.services}>
          <h3 className={`${styles.servicesTitle} h1-large`}>
            {pageContent.servicesTitle}
          </h3>
          <ul className={`${styles.servicesList} fp-col`}>
            {pageContent.servicesList.map((service: any) => (
              <li className={`${styles.servicesList__item} fp-col`}>
                <h3 className={`${styles.serviceTitle} h3`}>{service.serviceTitle}</h3>
                <p className={styles.serviceText}>{service.serviceDescription}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.about} id="about">
          <h4 className={`${styles.aboutTitle} txt-up h1-jumbo`}>
            {pageContent.aboutTitle}
          </h4>
          <p className={`${styles.aboutText} h3`}>
            {pageContent.aboutText}
          </p>
        </section>
      </main>
      <footer className={styles.footer} id="footer">
        <div className={`${styles.footerWrap} container`}>
          <h5 className={`${styles.footerTitle} h3`}>
            {pageContent.footerTitle}
          </h5>
          <ul className={styles.footerMain}>
            {pageContent.footerLinks.map((link: any) => (
            <li className={styles.projectsList__item}>
              <a href={link.url} className="footerLink" target="_blank" rel="noopener noreferrer">
              <div className={`${styles.trigger} footerLink fp`}>
                <span className="h1-large">
                  {link.text}
                </span>
                <ArrowUpRight size={96} strokeWidth={1} className={`${styles.triggerIcon} img-responsive`} />
              </div>
              </a>
            </li>
            ))}
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

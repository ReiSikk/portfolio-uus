"use client";

import styles from "../page.module.css";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types/sanity";
import Link from "next/link";

interface ProjectProps {
  project: Project;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ProjectItem({ project, onMouseEnter, onMouseLeave }: ProjectProps) {
  const handleMouseEnter = () => {
    document.body.classList.add("hide-cursor");
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    document.body.classList.remove("hide-cursor");
    onMouseLeave?.();
  };

  // Remove the hide-cursor class when user navigates away
  const handleClick = () => {
    // Remove hide-cursor class before navigation
    document.body.classList.remove("hide-cursor");
  };

  // Create a clean slug from the client name
  const createCleanSlug = (text: string) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+/, "") // Trim hyphens from start
      .replace(/-+$/, ""); // Trim hyphens from end
  };

  const slug = project.title ? createCleanSlug(project.title) : "";

  return (
    <>
      <li className={styles.projectsList__item} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Link
          href={`/projects/${slug}`}
          prefetch={true}
          aria-label={`View details about ${project.title} project`}
          onClick={handleClick}
        >
          <div className={`${styles.trigger} fp`}>
            <h3 className="h1-large">{project.title}</h3>
            <div className={`${styles.trigger__icons} fp`}>
              <div className={`${styles.tags__wrap} fp`}>
                {project.roleKeyword && <span className="tag">{project.roleKeyword}</span>}
                {project.year && <span className="tag tag_year">{project.year}</span>}
              </div>
              <ArrowUpRight size={96} strokeWidth={1} className={`${styles.triggerIcon} img-responsive`} />
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

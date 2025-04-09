"use client"

import styles from "../page.module.css"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "../types/sanity"
import Link from "next/link"

interface ProjectProps {
  project: Project;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ProjectItem({ project, onMouseEnter, onMouseLeave }: ProjectProps) {

  const handleMouseEnter = () => {
    document.body.classList.add('hide-cursor');
    onMouseEnter?.();
  };
  
  const handleMouseLeave = () => {
    document.body.classList.remove('hide-cursor');
    onMouseLeave?.();
  };

  return (
    <>
      <li 
      className={styles.projectsList__item}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
        <Link href={`/projects/${encodeURIComponent(project.title || '')}?id=${encodeURIComponent(project._id)}`}>
        <div className={`${styles.trigger} fp`}>
          <h3 className="h1-large">{project.title}</h3>
          <ArrowUpRight size={96} strokeWidth={1} className={`${styles.triggerIcon} img-responsive`} />
        </div>
        </Link>
      </li>
    </>
  )
}


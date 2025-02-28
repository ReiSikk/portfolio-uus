'use client';

import { useState } from 'react';
import styles from '../page.module.css';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types/sanity';

interface ProjectAccordionProps {
    project: Project;
  }

export default function ProjectItem({ project }: ProjectAccordionProps) {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <li className={styles.projectsList__item}>
      <div 
        className={`${styles.trigger} fp ${isActive ? styles.active : ''}`}
        onClick={handleToggle}
      >
        <h3 className="h1-large">{project.title}</h3>
        <ArrowUpRight size={96} strokeWidth={1} className={`${styles.triggerIcon} img-responsive`} />
      </div>
      <div className={`${styles.triggerContent} ${isActive ? styles.active : ''}`}>
        <p>{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          View project
        </a>
      </div>
    </li>
  );
}
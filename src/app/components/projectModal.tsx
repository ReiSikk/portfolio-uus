'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '../types/sanity'
import styles from './project-modal.module.css'
import { urlForImage } from '../lib/sanity'

interface ProjectModalProps {
  isOpen: boolean
  project: Project
  updateModalStates: () => void
}

export default function ProjectModal({ isOpen, project, updateModalStates }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(24);
  const [padding, setPadding] = useState(20);
  
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const containerHeight = modalRef.current.clientHeight;
      setFontSize(Math.max(24, containerHeight / 8));
      setPadding(Math.max(20, containerHeight * 0.1));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        updateModalStates()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, updateModalStates])

  if (!isOpen) return null


  return (
    <div className={styles.projectModal}>
      <div 
        ref={modalRef}
        className={styles.projectModal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          onClick={updateModalStates}
          className={styles.projectModal__closeBtn}
          aria-label="Close modal"
        >
            <span className={`${styles.closeTxt} txt-up h4-med`}>Close</span>
          <X size={24} className={styles.closeIcon}/>
        </div>
        
        <div className={styles.projectModal__hero}>
          <Image 
            src={urlForImage(project.heroImage).url()}
            alt={`${project.title} hero image`}
            fill
            className={`${styles.projectModal__heroImg} img-cover`}
            priority
          />
        </div>
        
        <div className={`${styles.projectModal__inner} fp`}>
            <div className={`${styles.projectModal__body} fp-col`}>
                <span className={`${styles.projectModal__title} h1`}>
                    {project.title}
                </span>

              {project.description && project.roles && (
                  <div className={`${styles.projectModal__main} fp`}>
                  {project.description && (
                      <p className={styles.projectModal__description}>{project.description}</p>
                  )}
  
                  {project.roles && (
                      <div className={`${styles.projectModal__roles} fp-col`}>
                        <span className={`${styles.projectModal__rolesTitle} h5-med`}>Roles</span>
                      {project.roles.map((role, index) => (
                          <span 
                          key={index} 
                          className={`${styles.projectModal__role} txt-up  h5-med`}
                          >
                          {role}
                          </span>
                      ))}
                      </div>
                  )}
                  </div>  
              )}
                 
                {project.images && project.images.length > 0 && (
                    <div className={styles.projectModal__imageGrid}>
                    {project.images.map((image, index) => (
                        <div key={index} className={styles.projectModal__imageWrapper}>
                        <Image 
                            src={urlForImage(image).url()}
                            alt={`Project image ${index + 1}`}
                            fill
                            className={styles.projectModal__image}
                        />
                        </div>
                    ))}
                    </div>
                )}
                
                <div className={styles.projectModal__links}>            
                    {project.githubLink && (
                    <a
                        href={project.githubLink}
                        className={`${styles.projectModal__link} ${styles.projectModal__linkSecondary}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub Repository
                    </a>
                    )}
                </div>
            </div>
          

          {project.link && (
            <a 
            href={project.link}
            className={`${styles.projectModal__link} ${styles.projectModal__linkPrimary} col-m-none`}
            target="_blank"
            rel="noopener noreferrer"
            >
            <div className={styles.linkTxtContainer}>
                {[...Array(4)].map((_, index) => (
                <div 
                    key={index}
                    className={`${styles.linkTxt} txt-up`}
                    style={{ 
                    fontSize: `${fontSize}px`,
                    paddingTop: `${padding}px`,
                    paddingBottom: `${padding}px`,
                    top: `${index * 100}%` // Position each text element at intervals
                    }}
                >
                    <span>View Project</span>
                </div>
                ))}
            </div>
            </a>
            )}
        </div>
      </div>
    </div>
  )
}
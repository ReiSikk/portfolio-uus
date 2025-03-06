'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Project } from '../types/sanity'
import styles from './project-modal.module.css'
import { urlForImage } from '../lib/sanity'
import { ArrowDown } from 'lucide-react'
import {PortableText} from '@portabletext/react'


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
        <button 
          onClick={updateModalStates}
          className={styles.projectModal__closeBtn}
          aria-label="Close modal"
        >
            <span className={`${styles.closeTxt} txt-up h4-med`}>Close modal</span>
        </button>
        
        <div className={styles.projectModal__hero}>
          <Image 
            src={urlForImage(project.heroImage).url()}
            alt={`${project.title} hero image`}
            fill
            className={`${styles.projectModal__heroImg} img-cover`}
            priority
          />
           <div className={styles.projectModal__heroOverlay}>
            <div className={styles.projectModal__scrollHint}>
              <span className="txt-up h5-med">Scroll Down</span>
              <ArrowDown size={24} strokeWidth={1}/>
            </div>
          </div>
        </div>
        
        <div className={`${styles.projectModal__inner} fp`}>
            <div className={`${styles.projectModal__body} fp-col`}>

              {project.description && project.roles && (
                  <div className={`${styles.projectModal__main} fp`}>
                  {project.description && (
                    <div className='fp-col'>
                      <span className={`${styles.projectModal__title} h1`}>
                        {project.title}
                      </span>
                      <div className={styles.projectModal__description}>
                        <PortableText
                            value={project.description}
                          />
                      </div>
                    </div>
                  )}
  
                  {project.roles && !project.githubLink && (
                    <div className={`${styles.rolesLinks} fp-col`}>
                      <div className={styles.projectModal__links}>            
                        <a 
                          href={project.githubLink}
                          className={`${styles.projectModal__link} ${styles.projectModal__linkSecondary} txt-up btn btn-primary`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className={styles.mainTxt}>Github Repo</span>
                          <span className={styles.hoverTxt}>Github Repo</span>
                        </a>
                      </div>
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
                            className={`${styles.projectModal__image} img-responsive`}
                        />
                        </div>
                    ))}
                    </div>
                )}
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
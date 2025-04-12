import React from 'react'
import { urlForImage } from '@/app/lib/sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { getProject, getProjectIdFromSlug } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
import styles from './projectPage.module.css';


type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  };

export default async function ProjectPage(props: Props) {

    const { slug } = await props.params;

     // Get project ID from slug
    const projectId = await getProjectIdFromSlug(slug);
    
    // If still no ID, return 404
    if (!projectId) {
      console.error("Could not find project ID for slug:", slug);
      return notFound();
    }
    
    // Fetch project by ID
    const project = await getProject(projectId);
    
    // If project not found, return 404
    if (!project) {
      return notFound();
    }
  
    // Get project images
    const getImageUrl = (imageField: SanityImageSource) => {
      if (!imageField) return null;
      try {
        return urlForImage(imageField).url();
      } catch (error) {
        console.error("Error generating image URL:", error);
        return null;
      }
    };

     // Check if project has images
    const hasImages = project.images && project.images.length > 0;


  return (
    <div className={styles.projectPage__wrapper}>
    <div className="container">
        <Link href="/" className={`btn backLink`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="none"
                viewBox="0 0 25 25"
            >
                <path
                fill="#000"
                d="M21.515 12.906a.75.75 0 0 1-.75.75H6.075l5.471 5.47a.751.751 0 0 1-1.061 1.06l-6.75-6.75a.75.75 0 0 1 0-1.06l6.75-6.75a.75.75 0 0 1 1.061 1.06l-5.47 5.47h14.69a.75.75 0 0 1 .75.75"
                ></path>
            </svg>
        <span className="mainTxt">Back to home</span>
        </Link>
    </div>
    <main className={`${styles.projectPage} container fp`}>
        <section className={styles.project__main}>
            <div className={styles.main__wrapper}>
                <h1 className={`${styles.title} h1-large`}>
                    {project.title}
                </h1>
                <div className={styles.roles}>
                    <ul className={`${styles.rolesList} fp`}>
                    {project.roles.map((role: string, index: number) => (
                        <li 
                        key={index}
                        className={styles.rolesList__item}
                        >
                            <span className={`${styles.role} txt-up monospace`}>
                                {role}
                            </span>
                        </li>
                    ))}
                    </ul>
                </div>
                {project.link && (
                    <a href={project?.link} target="_blank" rel="noopener noreferrer" className={`${styles.link} txt-up`}>
                        <span className={styles.divider}>
                        </span>
                        <span className={styles.text}>Visit website</span>
                    </a>
                )}
                <div className={styles.project__description}>
                    <PortableText
                        value={project.description}
                        components={{
                            block: (props) => {
                                return <p className={styles.description__paragraph}>{props.children}</p>
                            }
                        }}
                    />
                </div>
            </div>
        </section>
        <section className={styles.project__side}>
            <div className={styles.gallery}>
                <ul className={`${styles.galleryList} fp-col`}>
                    {hasImages && project.images.map((image: SanityImageSource, index: number) => (
                        <li 
                        key={index}
                        className={styles.galleryItem}
                        >
                            <Image 
                            src={getImageUrl(image) || ''}
                            alt={`${project.title} image ${index + 1}`}
                            width={500}
                            height={500}
                            className={`${styles.galleryImage} img-cover`}
                            priority={index === 0}
                            />
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    </main>
</div>
  )
}
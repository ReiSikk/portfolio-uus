import React from "react";
import { urlForImage } from "@/app/lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { getProject, getProjectIdFromSlug } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import styles from "./projectPage.module.css";
import { T, Var } from "gt-next";

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
		<T id="app.projects._slug_.page.1">
			<div className={styles.projectPage__wrapper}>
				<div className="container">
					<Link href="/" className={`btn backLink`}>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M14.0004 8.00028C14.0004 8.13289 13.9477 8.26006 13.8539 8.35383C13.7602 8.4476 13.633 8.50028 13.5004 8.50028H3.70727L7.35414 12.1465C7.4006 12.193 7.43745 12.2481 7.46259 12.3088C7.48773 12.3695 7.50067 12.4346 7.50067 12.5003C7.50067 12.566 7.48773 12.631 7.46259 12.6917C7.43745 12.7524 7.4006 12.8076 7.35414 12.854C7.30769 12.9005 7.25254 12.9373 7.19184 12.9625C7.13115 12.9876 7.06609 13.0006 7.00039 13.0006C6.9347 13.0006 6.86964 12.9876 6.80895 12.9625C6.74825 12.9373 6.6931 12.9005 6.64664 12.854L2.14664 8.35403C2.10016 8.30759 2.06328 8.25245 2.03811 8.19175C2.01295 8.13105 2 8.06599 2 8.00028C2 7.93457 2.01295 7.86951 2.03811 7.80881C2.06328 7.74811 2.10016 7.69296 2.14664 7.64653L6.64664 3.14653C6.74046 3.05271 6.86771 3 7.00039 3C7.13308 3 7.26032 3.05271 7.35414 3.14653C7.44796 3.24035 7.50067 3.3676 7.50067 3.50028C7.50067 3.63296 7.44796 3.76021 7.35414 3.85403L3.70727 7.50028H13.5004C13.633 7.50028 13.7602 7.55296 13.8539 7.64672C13.9477 7.74049 14.0004 7.86767 14.0004 8.00028Z"
								fill="#FFFFEE"
							/>
						</svg>

						<span className="mainTxt">Back to home</span>
					</Link>
				</div>
				<main className={`${styles.projectPage} container fp`}>
					<section className={styles.project__main}>
						<div className={styles.main__wrapper}>
							<h1 className={`${styles.title} h1-large`}>
								<Var>{project.title}</Var>
							</h1>
							<div className={styles.roles}>
								<ul className={`${styles.rolesList} fp`}>
									<Var>
										{project.roles.map((role: string, index: number) => (
											<li key={index} className={styles.rolesList__item}>
												<span className={`${styles.role} txt-up monospace`}>
													{role}
												</span>
											</li>
										))}
									</Var>
								</ul>
							</div>
							<Var>
								{project.link && (
									<T id="app.projects._slug_.page.0">
										<a
											href={project?.link}
											target="_blank"
											rel="noopener noreferrer"
											className={`${styles.link} txt-up`}
										>
											<span className={styles.divider}></span>
											<span className={styles.text}>Visit website</span>
										</a>
									</T>
								)}
							</Var>
							<div className={styles.project__description}>
								<PortableText
									value={project.description}
									components={{
										block: (props) => {
											return (
												<p className={styles.description__paragraph}>
													{props.children}
												</p>
											);
										},
									}}
								/>
							</div>
						</div>
					</section>
					<section className={styles.project__side}>
						<div className={styles.gallery}>
							<ul className={`${styles.galleryList} fp-col`}>
								<Var>
									{hasImages &&
										project.images.map(
											(image: SanityImageSource, index: number) => (
												<li key={index} className={styles.galleryItem}>
													<Image
														src={getImageUrl(image) || ""}
														alt={`${project.title} image ${index + 1}`}
														width={1256}
														height={676}
														quality={100}
														placeholder="blur"
														blurDataURL={getImageUrl(image) || ""}
														className={`${styles.galleryImage} img-cover`}
														priority={index === 0}
													/>
												</li>
											),
										)}
								</Var>
							</ul>
						</div>
					</section>
				</main>
			</div>
		</T>
	);
}

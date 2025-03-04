"use client"

import { useState } from "react"
import styles from "../page.module.css"
import { Plus } from "lucide-react"
import type { Project } from "../types/sanity"
import ProjectModal from "./projectModal"

interface ProjectProps {
  project: Project
}

export default function ProjectItem({ project }: ProjectProps) {
  const [isActive, setIsActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsActive(!isActive)
    //delay the opening of the modal to allow the plus icon to animate
    setTimeout(() => {
      setIsModalOpen(true)
    }
    , 300)
  }

  const updateModalStates = () => {
    setIsActive(!isActive)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <li className={styles.projectsList__item}>
        <div className={`${styles.trigger} fp ${isActive ? styles.active : ""}`} onClick={handleOpenModal}>
          <h3 className="h1-large">{project.title}</h3>
          <Plus size={96} strokeWidth={1} className={`${styles.triggerIcon} img-responsive`} />
        </div>
      </li>
      <ProjectModal isOpen={isModalOpen} updateModalStates={updateModalStates} project={project}/>
    </>
  )
}


'use server'

import sanityClient from '../lib/sanity';
import { cache } from 'react';
import { Project } from '../types/sanity';
// Cached project fetcher for all projects
export const getProjects = cache(async () => {
  const query = `*[_type == "project"]`;
  return await sanityClient.fetch(query);
});

// Get single project by ID - this is the primary method
export const getProject = cache(async (id: string) => {
  // Direct query by ID is most efficient
  const query = `*[_type == "project" && _id == $id][0]`;
  return await sanityClient.fetch(query, { id });
});

// Find project ID from slug - use this for route resolution
// export const getProjectIdFromSlug = cache(async (slug: string) => {
//   // Query to get just the ID based on client name
//   const query = `*[_type == "project" && client == $slug][0]._id`;
//   return await sanityClient.fetch(query, { slug });
// });

// Simplified function to find project ID from slug using only the JavaScript matching
export const getProjectIdFromSlug = cache(async (slug: string) => {
  try {
    // Decode the slug
    const decodedSlug = decodeURIComponent(slug).trim();

    const spaceVersion = decodedSlug.replace(/-/g, ' ').trim();  // With spaces instead of hyphens

    // Fetch all projects - using the cached version so this is efficient
    const allProjects = await getProjects();
    
    // Find a project with a matching client name using various transformations
    const matchingProject = allProjects.find((project: Project) => {
      if (!project.title) return false;
      
      // Normalize all strings to lowercase for case-insensitive comparison
      const clientName = project.title.toLowerCase().trim();
      
      const searchName = spaceVersion.toLowerCase().trim();
      
      // Try multiple matching strategies
      return clientName === searchName
    });
    
    if (matchingProject) {
      // console.log("Found matching project:", matchingProject.client);
      return matchingProject._id;
    } else {
      console.log("No matching project found for slug:", decodedSlug);
      console.log("Available projects:", allProjects.map((p: Project) => p.title));
      return null;
    }
  } catch (error) {
    console.error("Error in getProjectIdFromSlug:", error);
    return null;
  }
});
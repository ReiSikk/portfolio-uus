'use server'

import sanityClient from '../lib/sanity';
import { cache } from 'react';

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
export const getProjectIdFromSlug = cache(async (slug: string) => {
  // Query to get just the ID based on client name
  const query = `*[_type == "project" && client == $slug][0]._id`;
  return await sanityClient.fetch(query, { slug });
});
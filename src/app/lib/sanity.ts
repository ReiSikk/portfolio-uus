// lib/sanityClient.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const sanityClient = createClient({
  projectId: 'mpm26m66',
  dataset: 'production',
  apiVersion: '2025-02-26',
  useCdn: true, 
});

export default sanityClient;


// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

// Function to generate image URLs
export function urlForImage(source: any) {
  return builder.image(source);
}
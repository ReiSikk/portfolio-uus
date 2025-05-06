// lib/sanityClient.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';


const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-02-26',
  useCdn: true, 
});

export default sanityClient;


// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

// Function to generate image URLs with proper typing
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
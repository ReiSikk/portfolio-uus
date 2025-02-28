// lib/sanityClient.ts
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'mpm26m66',
  dataset: 'production',
  apiVersion: '2025-02-26',
  useCdn: true, 
});

export default sanityClient;

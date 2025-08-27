import {PortableTextBlock} from '@portabletext/react'

export interface Project {
    _id: string;
    title: string;
    description: PortableTextBlock[];
    heroImage: {
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    link: string;
    githubLink: string;
    images: {
      asset: {
        _ref: string;
        _type: "reference";
      };
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
    }[]; 
  roles: string[];
  year?: number | string;
  roleKeyword?: string;
  }
  

  export interface ServiceItem {
    serviceTitle: string;
    serviceDescription: string;
    _key?: string;
  }
  
  export interface FooterLink {
    text: string;
    url: string;
    _key?: string;
  }

  export interface StackItem {
    techTitle: string;
    techDescription: string;
    techLogo: {
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    randomHue: number;
    _key?: string;
  }

  export interface PageContent {
    heroTitle: string;
    heroBtn: string;
    projectsTitle: string;
    servicesTitle: string;
    servicesList: ServiceItem[];
    aboutTitle: string;
    aboutText: string;
    footerTitle: string;
    footerLinks: FooterLink[];
    techStackList: StackItem[];
    _createdAt?: string;
    _id?: string;
    _rev?: string;
    _type?: string;
    _updatedAt?: string;
  }
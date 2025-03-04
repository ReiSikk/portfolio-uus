export interface Project {
    _id: string;
    title: string;
    description: string;
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
    _createdAt?: string;
    _id?: string;
    _rev?: string;
    _type?: string;
    _updatedAt?: string;
  }
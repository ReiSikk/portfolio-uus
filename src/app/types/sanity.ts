export interface Project {
    _id: string;
    title: string;
    description: string;
    link: string;
    image: {
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
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
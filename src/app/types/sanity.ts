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
  
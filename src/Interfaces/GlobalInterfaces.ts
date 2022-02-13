export interface ChildrenProps {
   children: JSX.Element;
}

export interface Password {
   attributes: {
      title: string;
      username: string;
      email: string;
      password: string;
      siteUrl: string;
      faviconAddress: string;
   };
}

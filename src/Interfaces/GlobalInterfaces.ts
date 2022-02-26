export interface ChildrenProps {
   children: JSX.Element;
}

export interface Password {
   id: number;
   attributes: {
      title: string;
      username: string;
      email: string;
      password: string;
      siteUrl: string;
      faviconAddress: string;
      favorite: boolean;
   };
}

export interface IPagination {
   page: number;
   pageCount: number;
   pageSize: number;
   total: number;
}

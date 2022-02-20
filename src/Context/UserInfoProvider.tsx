import React, { useState, useContext, useEffect } from "react";
import { ChildrenProps } from "../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";

interface UserInfo {
   id: number;
   username: string;
   email: string;
   provider: string;
   confirmed: boolean;
   blocked: boolean;
   createdAt: string;
   updatedAt: string;
}

const UserInfoContext = React.createContext<UserInfo | null>(null);

export const useUserInfoContext = () => useContext(UserInfoContext);

const UserInfoProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [userInfo, setUserInfo] = useState<UserInfo | null>(() => null);

   useEffect(() => {
      const headersObject = {
         headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
         },
      };

      const userLogged = sessionStorage.getItem("jwt");

      try {
         if (userLogged) {
            const fetchedData = async () => {
               const result = await axios.get(
                  process.env.REACT_APP_PASSWORD_MANAGER_URL + "/api/users/1",
                  headersObject
               );
               setUserInfo(result.data);
            };

            fetchedData();
         } else {
            return;
         }
      } catch (err) {
         console.log(err);
         toast.error("Error occurred when fetching user info");
      }
   }, []);

   return <UserInfoContext.Provider value={userInfo}>{children}</UserInfoContext.Provider>;
};

export default UserInfoProvider;

import React, { useState, useContext, useEffect } from "react";
import { ChildrenProps } from "../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { headersObject, getJWT } from "../Utils/authorization";

interface UserInfo {
   username: string;
   email: string;
}

const UserInfoContext = React.createContext<UserInfo | null>(null);

export const useUserInfoContext = () => useContext(UserInfoContext);

const UserInfoProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [userInfo, setUserInfo] = useState<UserInfo | null>(() => null);

   useEffect(() => {
      try {
         if (getJWT) {
            const fetchedData = async () => {
               const result = await axios.get(
                  process.env.REACT_APP_PASSWORD_MANAGER_URL + "/api/users/me",
                  headersObject
               );
               setUserInfo({ username: result?.data?.username, email: result?.data?.email });
               console.log(result.data);
            };

            fetchedData();
         } else {
            return;
         }
      } catch (err) {
         toast.error("Error occurred when fetching user info", { toastId: "vrxblczm" });
      }
   }, []);

   return <UserInfoContext.Provider value={userInfo}>{children}</UserInfoContext.Provider>;
};

export default UserInfoProvider;

import React from "react";
import { Row, Col } from "react-bootstrap";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import DarkMode from "../../Components/SettingsComponents/DarkMode/DarkMode";
import UserCard from "../../Components/SettingsComponents/UserCard/UserCard";

const Settings: React.FC = (): JSX.Element => {
   // hooks
   const darkModeContext = useDarkModeContext();

   return (
      <div className={`page darkModeTransition ${darkModeContext?.darkMode ? "backgroundDarkMode" : "pageLightMode"}`}>
         <PageHeading />

         <Row xs={1} sm={2} md={3} className={`mt-5`}>
            <Col>
               <UserCard />
            </Col>
            <Col>
               <DarkMode />
            </Col>
         </Row>
      </div>
   );
};

export default Settings;

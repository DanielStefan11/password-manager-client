import React from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./Pages/Authentication/Authentication";

const App: React.FC = (): JSX.Element => {
   return (
      <div className="app">
         <Routes>
            <Route path="/" element={<Authentication />} />
         </Routes>
      </div>
   );
};

export default App;

import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import { ClientHomePage } from "./pages/Client/ClientHomePage";
import { PersonalData } from "./pages/Client/PersonalData";
import { FAQPage } from "./pages/FAQPage";

import { Home } from "./pages/Home";
import { Page404 } from "./pages/Page404";
import { ProtectedPage } from "./pages/ProtectedPage";

import "./styles/main.scss";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='home'
        element={
          <ProtectedPage redirectTo={"/"}>
            <Outlet />
          </ProtectedPage>
        }>
        <Route index element={<ClientHomePage />} />
        <Route path='personal-data' element={<PersonalData />} />
      </Route>
      <Route path='faq' element={<FAQPage />} />
      <Route path='*' element={<Page404 />} /> {/* 404 роут */}
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

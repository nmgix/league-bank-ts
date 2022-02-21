import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const ClientHomePage: React.FC = () => {
  return (
    <>
      <div>Client Protected (in future) page</div>
      <p>
        But for now, <Link to='personal-data'>you can change your credentials</Link>
      </p>

      <Outlet />
    </>
  );
};

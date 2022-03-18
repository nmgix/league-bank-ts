import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Notifications } from "../../components/ClientHomePage/Notifications";
import { Loader } from "../../components/essentials/Loader";
import { useAction } from "../../redux/hooks/useAction";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";

export const ClientHomePage: React.FC = () => {
  const user = useTypedSelector((state) => state.auth);
  const userInfo = useTypedSelector((state) => state.userInfo);

  const { state, error } = userInfo;

  const { getUserInfo } = useAction();

  useEffect(() => {
    if (user.state !== null && user.state.id !== null) {
      getUserInfo(user.state.id);
    }
  }, []);

  return (
    <>
      {state ? (
        <div>{state.notifications && <Notifications notifications={state.notifications} />}</div>
      ) : (
        <Loader text='Информация загружается, пожалуйста, подождите' />
      )}
      <Outlet />
    </>
  );
};

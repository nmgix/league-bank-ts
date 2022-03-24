import React, { useState } from "react";
import { INotifications } from "../../redux/types/UserType";
import { Modal } from "../essentials/Modal";
import NotificationsSvg from "../../images/notifications.svg";
import { Loader } from "../essentials/Loader";

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

export const Notifications: React.FC<{ notifications: INotifications | undefined | null }> = ({ notifications }) => {
  const [activeNotifications, setActiveNofitications] = useState<boolean>(false);

  return (
    <div className='notifications'>
      <button
        className='notifications-button'
        onClick={() => {
          setActiveNofitications(!activeNotifications);
        }}>
        <img src={NotificationsSvg} draggable={false} />
      </button>
      <Modal parentClassName='modal-notifications' active={activeNotifications} setActive={setActiveNofitications}>
        <ul>
          {notifications !== null && notifications !== undefined ? (
            Object.keys(notifications).map((notification) => {
              return (
                <li key={notification}>
                  <p>{notifications[notification].title}</p> <span>{notifications[notification].description}</span>
                  <span className='notifications-date'>
                    {new Date(notifications[notification].date).toLocaleString("ru", timeFormatOptions)}
                  </span>
                </li>
              );
            })
          ) : (
            <Loader text='Информация загружается, пожалуйста, подождите' />
          )}
        </ul>
      </Modal>
    </div>
  );
};

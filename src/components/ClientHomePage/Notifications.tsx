import React, { useState } from "react";
import { INotifications } from "../../redux/types/UserType";
import { Modal } from "../essentials/Modal";
import NotificationsSvg from "../../images/notifications.svg";

export const Notifications: React.FC<{ notifications: INotifications }> = ({ notifications }) => {
  const [activeNotifications, setActiveNofitications] = useState<boolean>(false);

  return (
    <div className='notifications'>
      <button
        className='notifications-button'
        onClick={() => {
          console.log(activeNotifications);
          setActiveNofitications(!activeNotifications);
        }}>
        <img src={NotificationsSvg} />
      </button>
      <Modal parentClassName='modal-notifications' active={activeNotifications} setActive={setActiveNofitications}>
        <ul>
          {Object.keys(notifications).map((notification) => {
            return (
              <li key={notification}>
                <div>
                  <p>{notifications[notification].title}</p> <span>{notifications[notification].description}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </Modal>
    </div>
  );
};

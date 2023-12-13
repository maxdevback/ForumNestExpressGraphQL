import React, { useEffect, useState } from "react";
import { NotificationsFetch } from "../../api/notifications.fetch";
import "./style.sass";

export const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      const response = await NotificationsFetch.get(page);
      console.log(response);
      setNotifications(response.body);
    })();
  }, []);
  return (
    <section className="Notification">
      {notifications.map((notification) => {
        return (
          <div className="notificationCard">
            <div className="notificationHeader">
              <span className="notificationId">ID: {notification.id}</span>
            </div>
            <div className="notificationBody">{notification.body}</div>
          </div>
        );
      })}
    </section>
  );
};

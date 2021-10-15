import React from "react";
import { NotificationManager } from "react-notifications";

const notification = ({ type, title, message }) => {
  console.log("In Notification Function");
  switch (type) {
    case "info":
      NotificationManager.info(title);
      break;
    case "success":
      NotificationManager.success(message, title);
      break;
    case "warning":
      NotificationManager.warning(message, title, 3000);
      break;
    case "error":
      NotificationManager.error(message, title, 5000);
      break;
  }
};

export default notification;

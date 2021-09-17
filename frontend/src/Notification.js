import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Example = ({ type, title, message }) => {
    switch (type) {
        case 'info':
            NotificationManager.info(title);
            break;
        case 'success':
            NotificationManager.success(message, title);
            break;
        case 'warning':
            NotificationManager.warning(message, title, 3000);
            break;
        case 'error':
            NotificationManager.error(message, title, 5000);
            break;
    }
    return (
        <NotificationContainer />
    );
}

export default Example;
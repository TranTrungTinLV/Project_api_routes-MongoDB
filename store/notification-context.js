import { createContext, useState, useEffect } from 'react';
//createContext nhằm để tạo một context mới để quản lý thông báo đăng ký trang thái 
const NotificationContext = createContext({
    notification: null, //{title, message, status} giá trị ban đầu sẽ là null
    showNotification: function (notificationData) { },
    hideNotification: function () { },
});


export function NotificationContextProvider(props) {
    const [activeNotification, setActiveNotification] = useState(); // useState nhằm để khởi tạo trạng thái ẩn và hiển thị thông báo

    useEffect(() => {
        if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'pending' || activeNotification.status === 'error'))
        {
    } {
        const timer = setTimeout(() =>{
            setActiveNotification(null)
        },3000);
        return () =>{
            clearTimeout(timer);
        }
    }

    }
    , [activeNotification])
    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData);
    } //
    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const context = { notification: activeNotification, showNotification: showNotificationHandler, hideNotification: hideNotificationHandler }
    return (
        <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>
    )
}

export default NotificationContext;

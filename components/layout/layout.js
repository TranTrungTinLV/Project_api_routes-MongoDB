import { Fragment, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';

import MainHeader from './main-header';

function Layout(props) {
  const notificationCtxt = useContext(NotificationContext);
  const activeNotification = notificationCtxt.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (<Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />)}
    </Fragment>
  );
}

export default Layout;

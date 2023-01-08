import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  
  function registrationHandler(event) {
    const enteredEmail = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: 'Singing up...',
      message: 'Regetering for newsletter',
      status: 'pending'
    })
    event.preventDefault();
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong')
        });
      })
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successing regitered for newsletter',
          status: 'success'
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'ERROR',
          message: error.message || 'regitering newsletter',
          status: 'error'
        })
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notifications.');
      return false;
    }
  
    if (Notification.permission === 'granted') {
      return true;
    }
  
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
  
    return false;
  };
  
  export const showNotification = (title, options) => {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  };
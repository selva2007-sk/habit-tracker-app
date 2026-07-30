/**
 * NotificationService handles browser-based notifications.
 * This is the web equivalent of flutter_local_notifications.
 */
export const notificationService = {
  /**
   * Request permission to show notifications.
   */
  requestPermission: async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },

  /**
   * Schedule a notification (simulated for web).
   * In a real web app, this would often be handled by a Service Worker.
   */
  scheduleDailyReminder: (title: string, body: string, hour: number, minute: number) => {
    console.log(`Scheduled daily reminder: ${title} at ${hour}:${minute}`);
    
    // For demo purposes, we'll just show a notification if permission is granted
    if (Notification.permission === 'granted') {
      // This is a simplified version. Real scheduling requires Service Workers.
      setTimeout(() => {
        new Notification(title, { body, icon: '/logo192.png' });
      }, 5000); // Show after 5 seconds for demo
    }
  },

  /**
   * Cancel all notifications.
   */
  cancelAll: () => {
    console.log('All notifications cancelled.');
  }
};

// @/stores/notifications.ts
import { create } from 'zustand';


interface Notification {
  read: boolean;
  text: string;
}

interface NotificationStore {
  notifications: Notification[];
  markAsRead: (index: number) => void;
  deleteNotification: (index: number) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    { read: false, text: 'This is a notification.' },
    { read: false, text: 'notification two' },
    { read: false, text: 'notification three' },
    { read: false, text: 'Only on the brink of destruction will some people find the will to change.' },
  ],
  markAsRead: (index) =>
    set((state) => {
      const newNotifications = [...state.notifications];
      newNotifications[index].read = true;
      return { notifications: newNotifications };
    }),
    deleteNotification: (index) => 
      set((state) => {
        // Use filter to create a new array without the deleted notification
        const newNotifications = state.notifications.filter((_, i) => i !== index);
        return {notifications: newNotifications}          
    }),
}));

export default useNotificationStore;

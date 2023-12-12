// Notifications @\components\nav\Notifications.tsx
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import useNotificationStore from '@/store/notifications';
import { cn } from '@/lib/utils';
import { IoMdClose } from 'react-icons/io';


export const NotifyCount = () => {
  const notifications = useNotificationStore((state:any) => state.notifications);

  const countUnread = notifications.filter((notification: { read: any; }) => !notification.read).length;
  const bgform = countUnread > 0 ? 'bg-red-700' : '';
  const displayCount = countUnread > 0 ? 'text-white' : 'text-white/0';

  return (
    <div className={`absolute -bottom-2 -right-2 w-5 h-4 rounded-full text-xs ${bgform}`}>
      <div className={`font-mono mt-[0.25px] text-center ${displayCount}`}>{countUnread}</div>
    </div>
  );
};

export const Notify = () => {
  const notifications = useNotificationStore((state:any) => state.notifications);
  const markAsRead = useNotificationStore((state:any) => state.markAsRead);
  const deleteNotification = useNotificationStore((state: any) => state.deleteNotification);

  useEffect(() => {
    // Mark all unread notifications as read after 4 seconds
    const unreadIndexes = notifications
      .map((notification: { read: any }, index: number) => (!notification.read ? index : -1))
      .filter((index:number) => index !== -1);
  
    if (unreadIndexes.length > 0) {
      setTimeout(() => {
        unreadIndexes.forEach((index:number) => markAsRead(index));
      }, 4000);
    }
  }, [notifications, markAsRead]);

  const handleDelete = (index: number) => {
    // Trigger the delete function when the close icon is clicked
    deleteNotification(index);
  };

  return (
    <div className="w-full my-2">
      {notifications.map((notification:any, index:number) => (
        <div key={index} className="w-full border rounded-md my-2 relative">
          <Card className={cn(`border-stone-600`, notification.read ? '' : 'bg-amber-500/30')}>
            <CardContent className="px-2 py-2">{notification.text}</CardContent>
          </Card>
          <div onClick={() => handleDelete(index)}
           className='absolute top-1 right-1 cursor-pointer '>
            <IoMdClose className={"text-md hover:text-amber-600 transition-all duration-300 transform hover:text-lg hover:scale-110"} />

          </div>
        </div>
      ))}
    </div>
  );
};

export default Notify;

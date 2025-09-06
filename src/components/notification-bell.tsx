import Link from "next/link";
import { Bell } from "lucide-react";

interface NotificationBellProps {
  hasUnread?: boolean;
  count?: number;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  hasUnread = true,
  count,
}) => {
  return (
    // <Link href="/#" className="relative inline-block">
    <Link href="/notification" className="relative inline-block">
      <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
      {hasUnread && (
        <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white">
          {count}
        </span>
      )}
    </Link>
  );
};

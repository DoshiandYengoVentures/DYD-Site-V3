export default function NotificationBadge({ count }: { count: number }) {
  if (!count || count <= 0) return null;

  return (
    <span className="notification-badge" aria-label={`${count} unread`}>
      {count > 99 ? "99+" : count}
    </span>
  );
}

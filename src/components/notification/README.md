# Notification Components

This directory contains components for handling different types of notifications in the application.

## Components

### `LikeCommentNotification`

A specialized component for handling like and comment notifications with Vietnamese text formatting.

#### Features

- **Smart text formatting**: Automatically formats text based on the number of users involved
  - Single user: `"user1 đã thích bài viết của bạn"`
  - Multiple users: `"user1 và 100 người khác đã thích bài viết của bạn"`
- **Visual indicators**: Shows appropriate icons (❤️ for likes, 💬 for comments)
- **Post preview**: Displays a truncated preview of the post content
- **Read status**: Visual indicators for read/unread notifications

#### Usage

```tsx
import { LikeCommentNotification } from "@/components/notification";

<LikeCommentNotification
  notification={notification}
  onClick={handleNotificationClick}
/>;
```

#### Props

- `notification`: `TNotification` - The notification object containing all notification data
- `onClick?`: `(id: number) => void` - Optional callback when notification is clicked

### `NotiCard`

The main notification card component that automatically routes like and comment notifications to the specialized `LikeCommentNotification` component.

#### Usage

```tsx
import { NotiCard } from "@/components/notification";

<NotiCard notification={notification} onClick={handleNotificationClick} />;
```

## Utility Functions

### `formatNotificationText`

Formats notification text based on type, actor, and count.

```tsx
import { formatNotificationText } from "@/utils/notificationHelpers";

const text = formatNotificationText(NotificationType.LIKE, actor, count);
```

### `getNotificationIcon`

Returns appropriate emoji icon for notification type.

```tsx
import { getNotificationIcon } from "@/utils/notificationHelpers";

const icon = getNotificationIcon(NotificationType.LIKE); // Returns "❤️"
```

### `truncateText`

Truncates text to specified length with ellipsis.

```tsx
import { truncateText } from "@/utils/notificationHelpers";

const shortened = truncateText("Long text here", 50);
```

## Notification Types Supported

- `LIKE`: Like notifications with heart icon
- `COMMENT`: Comment notifications with speech bubble icon
- `POST_CREATED`: Post creation notifications
- `POST_ACCEPTED`: Post approval notifications
- `POST_DENIED`: Post rejection notifications
- `ACHIEVEMENT`: Achievement notifications
- `MISSION`: Mission notifications
- `EXCHANGE_ITEMS`: Exchange transaction notifications

## Styling

The components use Tailwind CSS classes and follow the application's design system:

- Unread notifications have a blue background (`bg-blue-50`)
- Read notifications show a green dot indicator
- Hover effects for better UX
- Responsive design with proper text truncation

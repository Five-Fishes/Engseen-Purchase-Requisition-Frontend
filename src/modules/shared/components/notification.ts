import { NotificationType, NotificationPlacement } from '@constant/notification.enum'
import { notification } from 'antd'

export const popNotification = (message: string, type: NotificationType = NotificationType.info, placement: NotificationPlacement = NotificationPlacement.bottomRight, description?: string) => {
  notification[type]({
    message: message,
    description: description,
    duration: 3,
    placement: placement,
  })
}

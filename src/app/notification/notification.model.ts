export enum NotificationEnum {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}
export interface Notification {
  type: NotificationEnum;
  message: string;
}

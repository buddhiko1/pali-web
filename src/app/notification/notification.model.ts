export enum NotificationEnum {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface Notification {
  timestamp: number;
  type: NotificationEnum;
  message: string;
}

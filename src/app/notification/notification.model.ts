export enum NotificationEnum {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface Notification {
  timestamp: number;
  type: NotificationEnum;
  title: string;
  content: string;
}

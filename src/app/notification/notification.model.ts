import { InfoEnum } from '../core/public.value';

export interface Notification {
  timestamp: number;
  type: InfoEnum;
  title: string;
  content: string;
}

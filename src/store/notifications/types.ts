import type { NOTIFICATION_TYPE, NOTIFICATION_STATUS } from './constants';

export type NotificationStatus =
  (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS];

type BaseFields = {
  id: number;
  status: NotificationStatus;
  details: string;
};

type TipNotification = BaseFields & {
  type: typeof NOTIFICATION_TYPE.TIP;
  user: string;
  amount: number;
};

type ReferalNotification = BaseFields & {
  type: typeof NOTIFICATION_TYPE.REFERAL;
  user: string;
};

type MentionNotification = BaseFields & {
  type: typeof NOTIFICATION_TYPE.MENTION;
  user: string;
  message: string;
};

type BonusNotification = BaseFields & {
  type: typeof NOTIFICATION_TYPE.BONUS;
};

type PromotionNotification = BaseFields & {
  type: typeof NOTIFICATION_TYPE.PROMOTION;
  promotion: string;
};

export type Notification =
  | TipNotification
  | ReferalNotification
  | MentionNotification
  | BonusNotification
  | PromotionNotification;

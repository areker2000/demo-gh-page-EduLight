import type { ITeacher } from './teachers';

export interface ICartItem {
  coupon?: {
    code: string;
    due_date: number;
    id: string;
    is_enabled: number;
    percent: number;
    title: string;
  };
  final_total: number;
  id: string;
  product: ITeacher;
  product_id: string;
  qty: string;
  total: number;
}

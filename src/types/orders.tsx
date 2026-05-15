import type { ITeacher } from './teachers';

export interface IOrder {
  create_at: number;
  id: string;
  is_paid: false;
  message: string;
  products: [
    {
      id: string;
      product: ITeacher;
      product_id: string;
      qty: string;
      total: string;
    },
  ];
  user: {
    address: string;
    email: string;
    name: string;
    tel: string;
  };
  num: number;
}

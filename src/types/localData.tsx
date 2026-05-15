export interface INews {
  id: number;
  category: string;
  date: string;
  title: string;
  content: string[];
  imgUrl: string;
}

export interface ICoupons {
  title: string;
  code: string;
  method: string;
  value: number;
}

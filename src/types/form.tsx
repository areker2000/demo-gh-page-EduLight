export interface ICartForm {
  cardNumber: string;
  cardName: string;
  email: string;
  tel: number | null;
}

export interface ILoginForm {
  username?: string;
  password?: string;
}

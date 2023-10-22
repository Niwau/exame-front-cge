import { CategoryInterface } from "./CategoryInterface";

export interface ProductInterface {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category?: CategoryInterface;
}
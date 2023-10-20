import { CategoryInterface } from "./CategoryInterface";

export interface ProductInterface {
  name: string;
  price: number;
  quantity: number;
  category: CategoryInterface;
}
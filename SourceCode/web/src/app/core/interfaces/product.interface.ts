export interface Product {
  id?: number;
  productName: string;
  price: number;
  salePrice: number;
  productCode: string;
  categoryId: number;
  description?: string;
  image?: any;
  isStock?: boolean;
  isDelete?: boolean;
  isActive?: boolean;
  qty: number;
}

export interface IProductsResponse {
  content: {
    id: string;
    name: string;
    price: number;
    image: {
      id: string;
      filename: string;
      filetype: string;
      filePath: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  }[];
  totalElements: number;
}

export interface IProductResponse {
  id: string;
  name: string;
  price: number;
  image: {
    id: string;
    filename: string;
    filetype: string;
    filePath: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

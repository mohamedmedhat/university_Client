export interface IProducts {
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

export interface IProduct {
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

// export interface Product {
//   category: string;
//   description: string;
//   id: number;
//   image: string;
//   price: number;
//   rating: { rate: number; count: number };
//   title: string;
// }

export interface ExistStockResponse {
  productoId:      number;
  stockDisponible: boolean;
}


export interface ResponseProduct {
  totalItems:  number;
  totalPages:  number;
  currentPage: number;
  categoriaId: number;
  products:   Product[];
  sortBy:      string;
  sortDirection: string;
}

export interface Product {
  id:              number;
  nombre:          string;
  descripcion:     string;
  precio:          number;
  totalCantidad:   number;
  imageUrl:        string;
  categoriaId:     number;
  categoriaNombre: string;
  proveedorId:     number;
  proveedorNombre: string;
}


export interface ProductItemCart {
  product: Product;
  quantity: number;
}

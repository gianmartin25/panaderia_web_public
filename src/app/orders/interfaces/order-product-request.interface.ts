export interface OrderProductRequest {
    idDireccionEntrega: number;
    clienteId:          string;
    productos:          Producto[];
}

export interface Producto {
    idProducto: number;
    cantidad:   number;
}

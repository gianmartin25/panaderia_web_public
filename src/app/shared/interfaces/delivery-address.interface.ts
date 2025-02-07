export interface DeliveryAddressRequest {
    nombre:       string;
    direccion:    string;
    ciudad:       string;
    codigoPostal: string;
    clienteId:    string;
    numeroDni:   string;
}

export interface DeliveryAddressResponse {
    id:           number;
    nombre:       string;
    direccion:    string;
    ciudad:       string;
    codigoPostal: string;
    clienteId:    number;
    numeroDni:    null;
}

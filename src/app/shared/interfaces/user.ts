export interface UserRequest {
    email:    string;
    password: string;
}


export interface UserResponse {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    id:          string;
    username:    string;
    email:       string;
    tipoUsuario: string;
}

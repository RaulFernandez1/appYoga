export interface User {
    username: string,
    password: string
}

export interface UserResponse {
    token: string,
    alumno_id: string
}

export interface UserRequest {
    username: string,
    password: string,
    alumno_id: string,
    role: 'USUARIO' | 'ENTRENADOR'
}
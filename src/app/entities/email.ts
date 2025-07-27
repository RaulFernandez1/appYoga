export interface EmailMensajeRequest {
    to: string,
    subject: string,
    
    letra: string,
    nombre: string,
    rol: string,
    fechaHora: Date,
    asunto: string,
    contenido: string,

    importante: boolean,
    leido: boolean,
    grupo: boolean
}

export interface EmailReciboRequest {
    to: string,
    subject: string

    nombre: string,
    apellido1: string,
    apellido2: string,

    fecha: Date,
    importe: number,

    nivel: string
}

export interface EmailRequest {
    to: string,
    subject: string,
    body: string
}

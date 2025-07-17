
export interface Mensaje {
    id: number,
    contenido: string,
    fechaEnvio: Date,
    alumno_id: number
}

export interface IMensaje {

    contenido: string,
    fechaEnvio: Date,
    alumno_id: number
}

export class MesajeImpl implements IMensaje {
    contenido: string = ''
    fechaEnvio: Date = new Date()
    alumno_id: number = 0

    static mensajeToIMensaje(mensaje: Mensaje): IMensaje {
        return {
            contenido: mensaje.contenido,
            fechaEnvio: mensaje.fechaEnvio,
            alumno_id: mensaje.alumno_id
        }
    }
}
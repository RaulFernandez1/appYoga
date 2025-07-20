
export interface Mensaje {
    id: number,
    asunto: string,
    contenido: string,
    fechaEnvio: Date,
    leido: boolean,
    isgrupo: boolean,
    isimportante: boolean,
    alumno_id: number,
    grupo: number
}

export interface IMensaje {

    asunto: string,
    contenido: string,
    fechaEnvio: Date,
    leido: boolean,
    isgrupo: boolean,
    isimportante: boolean,
    alumno_id: number,
    grupo: number
}

export class MesajeImpl implements IMensaje {
    asunto: string = ''
    contenido: string = ''
    fechaEnvio: Date = new Date()
    leido: boolean = false
    isgrupo: boolean = false
    isimportante: boolean = false
    alumno_id: number = 0
    grupo: number = 0

    static mensajeToIMensaje(mensaje: Mensaje): IMensaje {
        return {
            asunto: mensaje.asunto,
            contenido: mensaje.contenido,
            fechaEnvio: mensaje.fechaEnvio,
            leido: mensaje.leido,
            isgrupo: mensaje.isgrupo,
            isimportante: mensaje.isimportante,
            alumno_id: mensaje.alumno_id,
            grupo: mensaje.grupo
        }
    }
}
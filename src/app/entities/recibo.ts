export interface Recibo {
    id: number,

    numerorecibo: string,

    pagado: boolean,
    cantidad: number,
    fecharecibo: Date,

    alumno: number
}

export interface IRecibo {

    numerorecibo: string,

    pagado: boolean,
    cantidad: number,
    fecharecibo: Date,

    alumno: number
}

export class ReciboImpl implements IRecibo {
    numerorecibo: string = ''
    pagado: boolean = true
    cantidad: number = 0
    fecharecibo: Date = new Date()
    alumno: number = 0

    static reciboToIRecibo(recibo: Recibo): IRecibo {
        return {
            numerorecibo: recibo.numerorecibo,
            cantidad: recibo.cantidad,
            alumno: recibo.alumno,
            pagado: recibo.pagado,
            fecharecibo: recibo.fecharecibo
        }
    }
}

export interface ReciboRequest {
    fechaemision: Date | null
}
export interface Gasto {
    id: number,

    fechagasto: Date | null,
    descripcion: string,
    cantidadgasto: number
}

export interface IGasto {

    fechagasto: Date | null,
    descripcion: string,
    cantidadgasto: number
}

export class GastoImpl implements IGasto {
    fechagasto: Date = new Date()
    descripcion: string = ''
    cantidadgasto: number = 0

    static gastoToIGasto(gasto: Gasto): IGasto {
        return {
            fechagasto: gasto.fechagasto,
            descripcion: gasto.descripcion,
            cantidadgasto: gasto.cantidadgasto
        }
    }
}
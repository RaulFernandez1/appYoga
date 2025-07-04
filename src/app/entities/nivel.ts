export interface Nivel {
    condicion: string,
    id: number,
    nombrenivel: string,

    preciomensualidad: number,
    preciobonos: number,
    precioclases: number
}

export interface INivel {

    nombrenivel: string,
    condicion: string,

    preciomensualidad: number,
    preciobonos: number,
    precioclases: number
    
}

export class NivelImpl implements INivel {
    nombrenivel: string = ''
    condicion: string = ''
    preciomensualidad: number = 0
    preciobonos: number = 0
    precioclases: number = 0

    static nivelToINivel(nivel: Nivel): INivel {
        return {
            nombrenivel: nivel.nombrenivel,
            condicion: nivel.condicion,

            preciomensualidad: nivel.preciomensualidad,
            preciobonos: nivel.preciobonos,
            precioclases: nivel.precioclases
        }
    }
}

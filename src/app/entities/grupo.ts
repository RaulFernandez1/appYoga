export interface Grupo {
    id: number,
    
    nombregrupo: string,
    horario: string,
    nivel: string
}

export interface IGrupo {

    nombregrupo: string,
    horario: string,
    nivel: string
}

export class GrupoImpl implements IGrupo {
    nombregrupo: string = ''
    horario: string = ''
    nivel: string = ''

    static grupoToIGrupo(grupo: Grupo): IGrupo {
        return {
            nombregrupo: grupo.nombregrupo,
            horario: grupo.horario,
            nivel: grupo.nivel,
        }
    }
}
export interface Alumno {
    id: number,

    dni: string,

    nombre: string,
    apellido1: string,
    apellido2: string,
    fechanacimiento: Date,

    profesion: string,
    direccion: string,
    poblacion: string,
    provincia: string,
    codigopostal: string,
    correo: string,
    telefono1: string,
    telefono2: string,

    fechaalta: Date,
    fechabaja: Date | null,
    condicion: string,
    precio: number,
    activo: boolean,
    bonos: boolean,
    mensualidad: boolean,
    clases: boolean,

    grupo_id: number
}


export interface IAlumno {

    dni: string,

    nombre: string,
    apellido1: string,
    apellido2: string,
    fechanacimiento: Date,

    profesion: string,
    direccion: string,
    poblacion: string,
    provincia: string,
    codigopostal: string,
    correo: string,
    telefono1: string,
    telefono2: string,

    fechaalta: Date,
    fechabaja: Date | null,
    condicion: string,
    precio: number,
    activo: boolean,
    bonos: boolean,
    mensualidad: boolean,
    clases: boolean,

    grupo_id: number
}

export class AlumnoImpl implements IAlumno {
    dni: string = '';
    
    nombre: string = '';
    apellido1: string = '';
    apellido2: string = '';
    fechanacimiento: Date = new Date();
    profesion: string = '';
    direccion: string = '';
    poblacion: string = '';
    provincia: string = '';
    codigopostal: string = '';
    correo: string = '';
    telefono1: string = '';
    telefono2: string = '';
    fechaalta: Date = new Date();
    fechabaja: Date | null = null;

    condicion: string = '';
    precio: number = 0;
    activo: boolean = false;
    bonos: boolean = false;
    clases: boolean = false;
    mensualidad: boolean = false;
    grupo_id: number = 0;
    
    static alumnoToIAlumno(alumno: Alumno): IAlumno {
        return {
            dni: alumno.dni,

            nombre: alumno.nombre,
            apellido1: alumno.apellido1,
            apellido2: alumno.apellido2,
            fechanacimiento: alumno.fechanacimiento,

            profesion: alumno.profesion,
            direccion: alumno.direccion,
            poblacion: alumno.poblacion,
            provincia: alumno.provincia,
            codigopostal: alumno.codigopostal,
            correo: alumno.correo,
            telefono1: alumno.telefono1,
            telefono2: alumno.telefono2,

            fechaalta: alumno.fechaalta,
            fechabaja: alumno.fechabaja,
            condicion: alumno.condicion,
            precio: alumno.precio,
            activo: alumno.activo,
            bonos: alumno.bonos,
            mensualidad: alumno.mensualidad,
            clases: alumno.clases,

            grupo_id: alumno.grupo_id
        }
    }
}
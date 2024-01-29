export interface People {
    ID?: string
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    homeworld: string
    films: string[]
    species: string[]
    vehicles: string[]
    starships: string[]
    created: string
    edited: string
    url: string
}

export interface Persona {
    ID?: string
    nombre: string;
    altura: string;
    masa: string;
    colorDeCabello: string;
    colorDePiel: string;
    colorDeOjos: string;
    anioDeNacimiento: string;
    genero: string;
    ciudadNatal: string;
    peliculas: string[];
    especies: string[];
    vehiculos: string[];
    navesEstelares: string[];
    creado: string;
    editado: string;
    url: string;
}

export const ConvertPeopleToPersona = (people: People): Persona => {
    return {
        ID: people.ID,
        nombre: people.name,
        altura: people.height,
        masa: people.mass,
        colorDeCabello: people.hair_color,
        colorDePiel: people.skin_color,
        colorDeOjos: people.eye_color,
        anioDeNacimiento: people.birth_year,
        genero: people.gender === 'male' ? 'masculino' : people.gender === 'female' ? 'femenino' : people.gender,
        ciudadNatal: people.homeworld,
        peliculas: people.films,
        especies: people.species,
        vehiculos: people.vehicles,
        navesEstelares: people.starships,
        creado: people.created,
        editado: people.edited,
        url: people.url
    };
}

export function isPeople(object: any): object is People {
    const requiredStringFields = [
        'name', 'height', 'mass', 'hair_color', 'skin_color', 
        'eye_color', 'birth_year', 'gender', 'homeworld', 
        'created', 'edited', 'url'
    ];

    const requiredArrayFields = ['films', 'species', 'vehicles', 'starships'];

    // Verifying string fields are present and of type string
    const hasAllStringFields = requiredStringFields.every(field => 
        object.hasOwnProperty(field) && typeof object[field] === 'string'
    );

    // Verifying array fields are present and are arrays
    const hasAllArrayFields = requiredArrayFields.every(field => 
        object.hasOwnProperty(field) && Array.isArray(object[field])
    );

    return hasAllStringFields && hasAllArrayFields;
}

export function ConvertDynamoItemToPersona(item) {
    return {
        nombre: item.nombre,
        altura: item.altura,
        masa: item.masa,
        colorDeCabello: item.colorDeCabello,
        colorDePiel: item.colorDePiel,
        colorDeOjos: item.colorDeOjos,
        anioDeNacimiento: item.anioDeNacimiento,
        genero: item.genero,
        ciudadNatal: item.ciudadNatal,
        peliculas: item.peliculas || [],
        especies: item.especies || [],
        vehiculos: item.vehiculos || [],
        navesEstelares: item.navesEstelares || [],
        creado: item.creado,
        editado: item.editado,
        url: item.url
    };
}

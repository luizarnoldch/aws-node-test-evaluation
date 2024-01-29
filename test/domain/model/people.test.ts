import { People, Persona, ConvertPeopleToPersona, isPeople } from './../../../src/domain/model/people'

describe('People Utilities', () => {
    describe('ConvertPeopleToPersona', () => {
        it('should correctly convert a People object to a Persona object', () => {
            const mockPeople: People = {
                ID: '1',
                name: 'John Doe',
                height: '180',
                mass: '80',
                hair_color: 'brown',
                skin_color: 'light',
                eye_color: 'blue',
                birth_year: '1990',
                gender: 'male',
                homeworld: 'Earth',
                films: [],
                species: [],
                vehicles: [],
                starships: [],
                created: '2020-01-01T00:00:00Z',
                edited: '2020-01-02T00:00:00Z',
                url: 'http://example.com/person/1'
            };

            const expectedPersona: Persona = {
                ID: '1',
                nombre: 'John Doe',
                altura: '180',
                masa: '80',
                colorDeCabello: 'brown',
                colorDePiel: 'light',
                colorDeOjos: 'blue',
                anioDeNacimiento: '1990',
                genero: 'masculino',
                ciudadNatal: 'Earth',
                peliculas: [],
                especies: [],
                vehiculos: [],
                navesEstelares: [],
                creado: '2020-01-01T00:00:00Z',
                editado: '2020-01-02T00:00:00Z',
                url: 'http://example.com/person/1'
            };

            const result = ConvertPeopleToPersona(mockPeople);
            expect(result).toEqual(expectedPersona);
        });
    });

    describe('isPeople', () => {
        it('should return true for a valid People object', () => {
            const mockPeople: any = {
                ID: '1',
                name: 'John Doe',
                height: '180',
                mass: '80',
                hair_color: 'brown',
                skin_color: 'light',
                eye_color: 'blue',
                birth_year: '1990',
                gender: 'male',
                homeworld: 'Earth',
                films: [],
                species: [],
                vehicles: [],
                starships: [],
                created: '2020-01-01T00:00:00Z',
                edited: '2020-01-02T00:00:00Z',
                url: 'http://example.com/person/1'
            };

            expect(isPeople(mockPeople)).toBeTruthy();
        });

        it('should return false for an invalid People object', () => {
            const invalidPeople: any = {
                ID: '1',
                name: 'John Doe',
                height: '180',
                mass: '80',
                hair_color: 'brown',
                skin_color: 'light',
                eye_color: 'blue',
                birth_year: '1990',
                homeworld: 'Earth',
                films: [],
                species: [],
                vehicles: [],
                starships: [],
                created: '2020-01-01T00:00:00Z',
                edited: '2020-01-02T00:00:00Z',
                url: 'http://example.com/person/1'
            };

            expect(isPeople(invalidPeople)).toBeFalsy();
        });
    });
});

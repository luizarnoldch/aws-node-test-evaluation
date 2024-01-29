import * as dotenv from "dotenv"
dotenv.config();

import { GetPeopleByIdFromSwapi } from "./../../../src/infrastructure/api/swapi";
import { People } from "./../../../src/domain/model/people";

import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

const API_BASE_URL: string | undefined = process.env.SWAPI_BASE_URL;

const PEOPLE_SWAPI: string | undefined = API_BASE_URL ? API_BASE_URL + "people/" : undefined;

test('GetPeopleByIdFromSwapi returns data for ID 1', async () => {
    const mockData:People = {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.py4e.com/api/planets/1/",
        "films": [
            "https://swapi.py4e.com/api/films/1/",
            "https://swapi.py4e.com/api/films/2/",
            "https://swapi.py4e.com/api/films/3/",
            "https://swapi.py4e.com/api/films/6/",
            "https://swapi.py4e.com/api/films/7/"
        ],
        "species": [
        "https://swapi.py4e.com/api/species/1/"
        ],
        "vehicles": [
            "https://swapi.py4e.com/api/vehicles/14/",
            "https://swapi.py4e.com/api/vehicles/30/"
        ],
        "starships": [
            "https://swapi.py4e.com/api/starships/12/",
            "https://swapi.py4e.com/api/starships/22/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.py4e.com/api/people/1/"
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result:Promise<People>| unknown = await GetPeopleByIdFromSwapi(1);

    expect(mockData.name).toEqual("Luke Skywalker")
    expect(result).toEqual(mockData);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(`${PEOPLE_SWAPI}1/`);
    expect("https://swapi.py4e.com/api/people/1").toEqual(`${PEOPLE_SWAPI}1`);
});

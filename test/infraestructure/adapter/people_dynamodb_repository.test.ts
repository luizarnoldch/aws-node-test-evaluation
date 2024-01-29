import { PeopleDynamoDBRepository } from "../../../src/infrastructure/adapter/people_dynamodb_repository"
import { Persona } from "../../../src/domain/model/people";

import { localDynamoDBClient } from "../../../utils/dynamodb/dynamodb_config"

import { createLocalDynamoDBStreamTable, deleteLocalDynamoDBStreamTable } from "../../../utils/dynamodb/dynamodb_init"

describe("PeopleDynamoDBRepository", () => {
  const TEST_PEOPLE_TABLE: string = process.env.TEST_PEOPLE_TABLE || "TEST_PEOPLE_TABLE";
  const client = localDynamoDBClient

  beforeAll(async () => {
    await createLocalDynamoDBStreamTable(client, TEST_PEOPLE_TABLE);
    console.log(`Table ${TEST_PEOPLE_TABLE} created successfully for testing.`);
  });

  afterAll(async () => {
    await deleteLocalDynamoDBStreamTable(client, TEST_PEOPLE_TABLE);
    console.log(`Table ${TEST_PEOPLE_TABLE} deleted successfully after testing.`);
  });


  it("GetPeopleFromSWAPI from PeopleDynamoDBRepository", async () => {
    
    const peopleDynamoDBRepository = new PeopleDynamoDBRepository(client, TEST_PEOPLE_TABLE)

    const mockDataResult:Persona = {
        "nombre": "Luke Skywalker",
        "altura": "172",
        "masa": "77",
        "colorDeCabello": "blond",
        "colorDePiel": "fair",
        "colorDeOjos": "blue",
        "anioDeNacimiento": "19BBY",
        "genero": "masculino",
        "ciudadNatal": "https://swapi.py4e.com/api/planets/1/",
        "peliculas": [
            "https://swapi.py4e.com/api/films/1/",
            "https://swapi.py4e.com/api/films/2/",
            "https://swapi.py4e.com/api/films/3/",
            "https://swapi.py4e.com/api/films/6/",
            "https://swapi.py4e.com/api/films/7/"
        ],
        "especies": [
        "https://swapi.py4e.com/api/species/1/"
        ],
        "vehiculos": [
            "https://swapi.py4e.com/api/vehicles/14/",
            "https://swapi.py4e.com/api/vehicles/30/"
        ],
        "navesEstelares": [
            "https://swapi.py4e.com/api/starships/12/",
            "https://swapi.py4e.com/api/starships/22/"
        ],
        "creado": "2014-12-09T13:50:51.644000Z",
        "editado": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.py4e.com/api/people/1/"
    }

    const result:Promise<Persona>| unknown = await peopleDynamoDBRepository.GetPeopleFromSWAPI(1)
    expect(result).toEqual(mockDataResult);
  });


  it("PostPeopleToDynamoDB from PeopleDynamoDBRepository", async () => {
    const peopleDynamoDBRepository = new PeopleDynamoDBRepository(client, TEST_PEOPLE_TABLE)

    const mockData:Persona = {
        "ID":"",
        "nombre": "Luke Skywalker",
        "altura": "172",
        "masa": "77",
        "colorDeCabello": "blond",
        "colorDePiel": "fair",
        "colorDeOjos": "blue",
        "anioDeNacimiento": "19BBY",
        "genero": "masculino",
        "ciudadNatal": "https://swapi.py4e.com/api/planets/1/",
        "peliculas": [
            "https://swapi.py4e.com/api/films/1/",
            "https://swapi.py4e.com/api/films/2/",
            "https://swapi.py4e.com/api/films/3/",
            "https://swapi.py4e.com/api/films/6/",
            "https://swapi.py4e.com/api/films/7/"
        ],
        "especies": [
        "https://swapi.py4e.com/api/species/1/"
        ],
        "vehiculos": [
            "https://swapi.py4e.com/api/vehicles/14/",
            "https://swapi.py4e.com/api/vehicles/30/"
        ],
        "navesEstelares": [
            "https://swapi.py4e.com/api/starships/12/",
            "https://swapi.py4e.com/api/starships/22/"
        ],
        "creado": "2014-12-09T13:50:51.644000Z",
        "editado": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.py4e.com/api/people/1/"
    }

    const result = await peopleDynamoDBRepository.PostPeopleToDynamoDB(mockData) as Persona;

    const ID:string | undefined = result.ID

    mockData.ID = ID

    expect(result.nombre).toEqual(mockData.nombre);
  });
});

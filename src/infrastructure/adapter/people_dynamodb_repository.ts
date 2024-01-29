import { PeopleRepository } from "./../../domain/repostiory/people_repository";

import { DynamoDBClient }  from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand
} from "@aws-sdk/lib-dynamodb";

import { Persona, ConvertPeopleToPersona, isPeople, ConvertDynamoItemToPersona } from "../../domain/model/people";

import { GetPeopleByIdFromSwapi } from "./../api/swapi"
import { randomUUID } from "crypto";

export class PeopleDynamoDBRepository implements PeopleRepository {
  private ddbDocClient: DynamoDBDocumentClient;
  private tableName: string | undefined;

  constructor(ddbClient: DynamoDBClient, tableName: string | undefined) {
    this.ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
    this.tableName = tableName;
  }

  async GetPeopleFromSWAPI(id: number): Promise<Persona | unknown> {
    try {
        const people = await GetPeopleByIdFromSwapi(id);
        if (isPeople(people)) {
            const persona = ConvertPeopleToPersona(people);
            return persona;
        } else {
            throw new Error("El objeto recibido no es de tipo People");
        }
    } catch (error) {
        return error;
    }
  }

  async PostPeopleToDynamoDB(persona: Persona): Promise<Persona | unknown> {

    const id: string = randomUUID();
    persona.ID = id

    const params = {
      TableName: this.tableName,
      Item: persona,
    };

    await this.ddbDocClient.send(new PutCommand(params));

    try {
      await this.ddbDocClient.send(new PutCommand(params));
    } catch (error) {
      return error
    }

    return persona;
  }

  async GetPeopleFromDynamoDB(id: number): Promise<Persona | unknown> {
    try {
        const params = {
            TableName: this.tableName,
            Key: {
                'ID': id
            }
        };

        const { Item } = await this.ddbDocClient.send(new GetCommand(params));

        if (!Item) {
            throw new Error(`Persona con ID ${id} no encontrada.`);
        }
        const persona: Persona = ConvertDynamoItemToPersona(Item);

        return persona;
    } catch (error) {
        console.error("Error al obtener persona de DynamoDB:", error);
        return error;
    }
}
}
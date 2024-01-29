import { Persona } from "../../domain/model/people";

export interface PeopleService {
    GetPeopleFromSWAPI(id: number): Promise<Persona> | unknown;
    PostPeopleToDynamoDB(persona: Persona): Promise<Persona> | unknown;
    GetPeopleFromDynamoDB(id: number): Promise<Persona> | unknown;
}
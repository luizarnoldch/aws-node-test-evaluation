import { Persona } from "./../model/people";

export interface PeopleRepository {
    GetPeopleFromSWAPI(id: number): Promise<Persona> | unknown;
    PostPeopleToDynamoDB(persona: Persona): Promise<Persona> | unknown;
}
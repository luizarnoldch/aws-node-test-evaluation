import { Persona } from "../../domain/model/people";
import { PeopleRepository } from "../../domain/repostiory/people_repository";
import { PeopleService } from "./people_service";

export class PeopleServiceDynamoDB implements PeopleService {
    private repository: PeopleRepository;
  
    constructor(repository: PeopleRepository) {
        this.repository = repository
    }
  
    async GetPeopleFromSWAPI(id: number): Promise<Persona | unknown> {
        return this.repository.GetPeopleFromSWAPI(id)
    }
  
    async PostPeopleToDynamoDB(persona: Persona): Promise<Persona | unknown> {
        return this.repository.PostPeopleToDynamoDB(persona)
    }
    async GetPeopleFromDynamoDB(id: string): Promise<Persona | unknown>  {
        return this.repository.GetPeopleFromDynamoDB(id)
    }
}

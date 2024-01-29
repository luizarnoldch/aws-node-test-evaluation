import * as dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Request, Response } from "express";
import { PeopleServiceDynamoDB } from "../service/people_service_dynamodb";
import { PeopleDynamoDBRepository } from "../../infrastructure/adapter/people_dynamodb_repository";
import { localDynamoDBClient } from "../../../utils/dynamodb/dynamodb_config";

dotenv.config();

const PEOPLE_TABLE = process.env.PEOPLE_TABLE || process.env.TEST_PEOPLE_TABLE;

const dynamoClient = process.env.PEOPLE_TABLE
    ? new DynamoDBClient()
    : localDynamoDBClient;

const peopleRepository = new PeopleDynamoDBRepository(dynamoClient, PEOPLE_TABLE);
const peopleService = new PeopleServiceDynamoDB(peopleRepository);

export const GetPeopleFromSWAPI = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idReq: number = parseInt(id, 10)
    try {
        const response = await peopleService.GetPeopleFromSWAPI(idReq);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        console.log(response)

        res.json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const PostPeopleToDynamoDB = async (req: Request, res: Response) => {
    try {
        const newPerson = await peopleService.PostPeopleToDynamoDB(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        console.log(newPerson)

        res.status(201).json(newPerson);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const GetPeopleFromDynamoDB = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    try {
        const response = await peopleService.GetPeopleFromDynamoDB(id);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        console.log(response)

        res.json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

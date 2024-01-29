import * as dotenv from "dotenv"
dotenv.config();

import { People } from "./../../domain/model/people"

const API_BASE_URL: string | undefined = process.env.SWAPI_BASE_URL;

const PEOPLE_SWAPI: string | undefined = API_BASE_URL ? API_BASE_URL + "people/" : undefined;

export const GetPeopleByIdFromSwapi = async (id: number): Promise<People | unknown> => {
    const url = `${PEOPLE_SWAPI}${id}/`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: Promise<People> | unknown = await response.json();
    return data;
};
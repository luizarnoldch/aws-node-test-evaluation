import * as dotenv from "dotenv"
dotenv.config();

import axios from "axios"

import { People } from "./../../domain/model/people"

const API_BASE_URL: string | undefined = process.env.SWAPI_BASE_URL;

const PEOPLE_SWAPI: string | undefined = API_BASE_URL ? API_BASE_URL + "people/" : undefined;

export const GetPeopleByIdFromSwapi = async (id: number): Promise<People> => {
    const url = `${PEOPLE_SWAPI}${id}/`;
    try {
        const response = await axios.get(url);
        return response.data; // `data` is already a JavaScript object, no need to call `.json()`
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // You can access the response property of the error object, if the request was made and server responded with a status code out of 2xx range
            console.error(`Error fetching data: ${error.response?.statusText}`);
            throw new Error(`Error fetching data: ${error.response?.statusText}`);
        } else {
            // Handle non-Axios errors differently
            console.error(`Error fetching data: ${error}`);
            throw error;
        }
    }
};
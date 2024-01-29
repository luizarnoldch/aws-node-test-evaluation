import { Router } from "express";
import { GetPeopleFromSWAPI, PostPeopleToDynamoDB, GetPeopleFromDynamoDB } from "./express_handlers";


const router = Router()

router.get("/people/:id", GetPeopleFromSWAPI);
router.post("/people", PostPeopleToDynamoDB);
router.get("/people/dynamo/:id", GetPeopleFromDynamoDB);

export default router
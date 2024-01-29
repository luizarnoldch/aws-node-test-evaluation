import { Router } from "express";
import { GetPeopleFromSWAPI, PostPeopleToDynamoDB } from "./express_handlers";


const router = Router()

router.get("/people/:id", GetPeopleFromSWAPI);
router.post("/people", PostPeopleToDynamoDB);

export default router
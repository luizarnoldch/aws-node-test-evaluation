import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import router from "./express_routes"

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

// Routes

app.get("/", (req: Request, res: Response) => {
    res.json(`Hello world ${process.env.SWAPI_BASE_URL}`)
});

app.use(router)

// Catch-all route for unhandled requests
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Not Found" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

export default app;

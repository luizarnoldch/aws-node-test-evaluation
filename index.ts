const serverless = require("serverless-http");
import * as dotenv from "dotenv";
dotenv.config();

import app from "./src/application/entrypoints/app_express"

module.exports.handler = serverless(app);
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import ejs from "ejs";
import path from 'path'
import { fileURLToPath } from 'url';
import route from "./controller/route.js";
import { connectDatabase } from "./config/dbConfig.js";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_STRING = process.env.DB_STRING_LOCAL;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectDatabase(DB_STRING)
  .then(() => {
    app.listen(PORT, console.log(`server started @${PORT}`));
  })
  .catch(() => {
    console.log(`Faild to connnect the database!`);
  });

app.use("/", route);

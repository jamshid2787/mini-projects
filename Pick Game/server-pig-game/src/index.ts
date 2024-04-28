import express from "express";
import cors from "cors";


import { pigRouter } from "./modules/pig";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/games/pig", pigRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

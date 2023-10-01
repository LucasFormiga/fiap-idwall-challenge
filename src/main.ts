import { DataSource } from "typeorm";
import express from "express";
import MostWanted from "./entity/MostWanted.js";
import UpdateInterpolDatabase from "./job/UpdateInterpolDatabase.js";
import UpdateFbiDatabase from "./job/UpdateFbiDatabase.js";
import route from "./routes.js";

const app = express();

app.use(express.json());
app.use(route);

export const databaseDatasource = new DataSource({
  type: 'oracle',
  host: 'oracle.fiap.com.br',
  port: 1521,
  database: 'dbtest',
  username: '',
  password: '',
  serviceName: 'ORCL',
  entities: [MostWanted],
  synchronize: true
});

databaseDatasource.initialize()
  .then(async () => {
    console.log("[FIAP] Database connected");

    const mostWantedRepo = databaseDatasource.getRepository(MostWanted);
    await mostWantedRepo.clear();

    await new UpdateInterpolDatabase().execute();
    await new UpdateFbiDatabase().execute();

    app.listen(3000, () => console.log("[FIAP] Web server exposed on port 3000"));
  })
  .catch(error => console.error(error));

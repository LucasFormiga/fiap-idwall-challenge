import { DataSource, Repository } from "typeorm";
import { databaseDatasource } from "../main.js";
import MostWanted from "../entity/MostWanted.js";
import FbiService from "../services/FbiService.js";

export default class UpdateFbiDatabase {
    private datasource: DataSource = databaseDatasource;
    private mostWantedRepo: Repository<MostWanted> = this.datasource.getRepository(MostWanted);
    private fbiService: FbiService;

    constructor() {
        this.fbiService = new FbiService();
    }

    async execute() {
        console.log("[FIAP] Updating FBI database");

        const mostWanteds = await this.fbiService.getMostWanted();

        mostWanteds.forEach(notice => this.mostWantedRepo.save({ name: notice.name, nationalities: JSON.stringify(notice.nationalities) }));

        console.log("[FIAP] Finished updating FBI database");
    }
}
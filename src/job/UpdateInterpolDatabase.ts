import { DataSource, Repository } from "typeorm";
import { databaseDatasource } from "../main.js";
import MostWanted from "../entity/MostWanted.js";
import InterpolService from "../services/InterpolService.js";

export default class UpdateInterpolDatabase {
    private datasource: DataSource = databaseDatasource;
    private mostWantedRepo: Repository<MostWanted> = this.datasource.getRepository(MostWanted);
    private interpolService: InterpolService;

    constructor() {
        this.interpolService = new InterpolService();
    }

    async execute() {
        console.log("[FIAP] Updating interpol database");

        const mostWanteds = await this.interpolService.getMostWanted();

        mostWanteds.forEach(notice => this.mostWantedRepo.save({ name: notice.name, nationalities: JSON.stringify(notice.nationalities) }));

        console.log("[FIAP] Finished updating interpol database");
    }
}
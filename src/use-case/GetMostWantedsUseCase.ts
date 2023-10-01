import { Repository } from "typeorm";
import MostWanted from "../entity/MostWanted.js";
import { databaseDatasource } from "../main.js";

export default class GetMostWantedsUseCase {
    private mostWantedRepo: Repository<MostWanted>;
    
    constructor() {
        this.mostWantedRepo = databaseDatasource.getRepository(MostWanted);
    }

    async execute() {
        const mostWanteds = await this.mostWantedRepo.find();

        return mostWanteds.map(wanted => ({
            ...wanted,
            nationalities: JSON.parse(wanted.nationalities)
        }));
    }
}
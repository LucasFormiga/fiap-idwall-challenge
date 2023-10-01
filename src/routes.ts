import { Request, Response, Router } from "express";
import GetMostWantedsUseCase from "./use-case/GetMostWantedsUseCase.js";

const route = Router();

route.get('/', async (_: Request, res: Response) => {
    const getMostWantedUseCase = new GetMostWantedsUseCase();
    const mostWanteds = await getMostWantedUseCase.execute();

    res.json({wanteds: mostWanteds});
});

export default route;
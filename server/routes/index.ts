import express = require('express')
import {container} from '../ioc'
import {ScraperCoordinatorService} from '../services/scraper/scraper-coordinator.service'
import {Bank} from "../repositories/bank-info/bank.enum";
export const rootRoutes = express.Router()

rootRoutes.get('/health', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send('OK')
})

rootRoutes.get('/search/:type', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('Req to process: ' + req.params.type)
    try {
        let testService = container.get<ScraperCoordinatorService>(ScraperCoordinatorService)
        let data = await testService.process(req.params.type)
        res.send({data})
    }catch(err){
        next(err)
    }
})

rootRoutes.get('/process/:bank/:user', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let bank = req.params.bank
        let testService = container.get<ScraperCoordinatorService>(ScraperCoordinatorService)
        let data = await testService.processBank(bank, req.params.user)
        res.send({data})
    }catch(err){
        next(err)
    }
})

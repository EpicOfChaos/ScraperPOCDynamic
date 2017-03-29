import express = require('express')
import {container} from '../ioc'
import {ScraperCoordinatorService} from '../services/scraper/scraper-coordinator.service'
export const rootRoutes = express.Router()

rootRoutes.get('/health', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send('OK')
})

rootRoutes.get('/process/:type', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let testService = container.get<ScraperCoordinatorService>(ScraperCoordinatorService)
        let data = await testService.process(req.params.type)
        res.send({data})
    }catch(err){
        next(err)
    }
})

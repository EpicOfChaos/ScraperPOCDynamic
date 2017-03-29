import {ScraperCoordinatorService} from './services/scraper/scraper-coordinator.service'
import {GoogleScraper2Service} from './services/google/google-scraper-2.service'
import {BingScraperService} from './services/bing/bing-scraper.service'
import {AskScraperService} from './services/ask/ask-scraper.service'

let services: any[] = [
    AskScraperService,
    BingScraperService,
    GoogleScraper2Service,
    ScraperCoordinatorService
]

export const DIList = [...services]
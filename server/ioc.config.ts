import {ScraperCoordinatorService} from './services/scraper/scraper-coordinator.service'
import {GoogleScraper2Service} from './services/horseman/google/google-scraper-2.service'
import {BingScraperService} from './services/horseman/bing/bing-scraper.service'
import {AskScraperService} from './services/horseman/ask/ask-scraper.service'
import {ChromiumTest} from "./services/chromium/chromium-test";

let services: any[] = [
    AskScraperService,
    BingScraperService,
    GoogleScraper2Service,
    ScraperCoordinatorService,
    ChromiumTest
]

export const DIList = [...services]
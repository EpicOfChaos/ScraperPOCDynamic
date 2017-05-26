import {ScraperCoordinatorService} from './services/scraper/scraper-coordinator.service'
import {GoogleScraper2Service} from './services/horseman/google/google-scraper-2.service'
import {BingScraperService} from './services/horseman/bing/bing-scraper.service'
import {AskScraperService} from './services/horseman/ask/ask-scraper.service'
import {ChromiumTest} from "./services/chrome-test/chromium-test";
import {ChromePoolService} from "./services/chrome/chrome-pool.service";
import {GWCUScraperService} from "./services/chrome-test/gwcu-scraper.service";
import {ConfigService} from "./services/config/config.service";
import {BankInfoRepository} from "./repositories/bank-info/bank-info.repository";

let services: any[] = [
    AskScraperService,
    BankInfoRepository,
    BingScraperService,
    ConfigService,
    GoogleScraper2Service,
    ScraperCoordinatorService,
    ChromePoolService,
    ChromiumTest,
    GWCUScraperService
]

export const DIList = [...services]
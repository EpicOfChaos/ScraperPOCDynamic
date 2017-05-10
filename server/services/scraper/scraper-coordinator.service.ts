import {injectable} from 'inversify'
import {GoogleScraper2Service} from "../horseman/google/google-scraper-2.service";
import {BingScraperService} from '../horseman/bing/bing-scraper.service'
import {AskScraperService} from '../horseman/ask/ask-scraper.service'
import {ChromiumTest} from "../chromium/chromium-test";

@injectable()
export class ScraperCoordinatorService {
    constructor(private googleScraper: GoogleScraper2Service,
                private bingScraper: BingScraperService,
                private askScraper: AskScraperService,
                private chromiumTest: ChromiumTest
    ) {}

    async process(type: string) {
        if(type === 'GOOGLE'){
            return await this.googleScraper.navigate()
        }else if(type === 'BING') {
            return await this.bingScraper.navigate()
        }else if(type === 'ASK'){
            return await this.askScraper.navigate()
        }else if(type === 'TEST') {
            return await this.chromiumTest.test()
        }else {
            throw new Error(`Unknown type: ${type}`)
        }
    }


}
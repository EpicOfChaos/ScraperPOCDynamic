import {injectable} from 'inversify'
import {GoogleScraper2Service} from "../google/google-scraper-2.service";
import {BingScraperService} from '../bing/bing-scraper.service'
import {AskScraperService} from '../ask/ask-scraper.service'

@injectable()
export class ScraperCoordinatorService {
    constructor(private googleScraper: GoogleScraper2Service,
                private bingScraper: BingScraperService,
                private askScraper: AskScraperService
    ) {}

    async process(type: string) {
        if(type === 'GOOGLE'){
            return await this.googleScraper.navigate()
        }else if(type === 'BING') {
            return await this.bingScraper.navigate()
        }else if(type === 'ASK'){
            return await this.askScraper.navigate()
        }else{
            throw new Error(`Unknown type: ${type}`)
        }
    }


}
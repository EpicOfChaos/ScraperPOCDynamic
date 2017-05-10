import {injectable} from 'inversify'
const Horseman = require('node-horseman')

@injectable()
export class AskScraperService {
    constructor() {}

    navigate(){
        let horseman = new Horseman()
        return horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open('http://www.ask.com/')
            .type('input[name="q"]', 'epicpockets.net')
            .click('#PartialHome-form .sb-button')
            .waitForSelector('.PartialSearchResults-item-title')
            .count('.PartialSearchResults-item-title')
            .log() // prints out the number of results
            .close()
    }
}
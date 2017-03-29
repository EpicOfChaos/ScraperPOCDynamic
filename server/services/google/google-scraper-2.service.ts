import {injectable} from 'inversify'
const Horseman = require('node-horseman')

@injectable()
export class GoogleScraper2Service {

    constructor() {}

    navigate(){
        let horseman = new Horseman()
           return horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open('http://www.google.com')
            .type('input[name="q"]', 'epicpockets.net')
            .click('[name="btnK"]')
            .keyboardEvent('keypress', 16777221)
            .waitForSelector('#resultStats')
            .text('#resultStats')
            .log() // prints out the number of results
            .close()
    }
}
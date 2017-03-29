import {injectable} from 'inversify'
const Horseman = require('node-horseman')

@injectable()
export class BingScraperService {
    constructor() {}

    navigate(){
        let horseman = new Horseman()
        return horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open('http://www.bing.com/')
            .type('input[name="q"]', 'epicpockets.net')
            .click('[name="go"]')
            .waitForSelector('#b_content')
            .text('#b_content #b_tween .sb_count')
            .log() // prints out the number of results
            .close()
    }
}
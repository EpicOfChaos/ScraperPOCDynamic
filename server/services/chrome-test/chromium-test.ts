import {injectable} from "inversify"
import {ChromePoolService} from "../chrome/chrome-pool.service";

@injectable()
export class ChromiumTest {
    constructor(private chromePoolService: ChromePoolService) {
    }

    async test() {
        let chromeInstance = await this.chromePoolService.getChromeInstance('http://www.ask.com/')
        try {
            await chromeInstance.pageLoaded()
            await chromeInstance.type('input[name="q"]', 'epicpockets.net')
            await chromeInstance.click('#PartialHome-form .sb-button')
            await chromeInstance.waitForElement('.PartialSearchResults-item-title')
            return await chromeInstance.count('.PartialSearchResults-item-title')
        } finally {
            await chromeInstance.close()
        }
    }
}
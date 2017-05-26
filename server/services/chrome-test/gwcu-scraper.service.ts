import {injectable} from "inversify";
import {ChromePoolService} from "../chrome/chrome-pool.service";
import {Chrome} from "../chrome/chrome";
import {BankInfo} from "../../repositories/bank-info/bank-info";

@injectable()

export class GWCUScraperService {
    constructor(private chromePoolService: ChromePoolService) {
    }

    async process(bankInfo: BankInfo) {
        console.log(bankInfo)
        let chromeInstance = await this.chromePoolService.getChromeInstance('https://online.gwcu.org/User/AccessSignin/Start')
        try {
            await chromeInstance.pageLoaded()
            await chromeInstance.clearCookies()
            console.log('Cleared cookies')
            await chromeInstance.setCookies('https://online.gwcu.org', bankInfo.cookies)
            console.log('Restored cookies')

            await chromeInstance.type('#UsernameField', bankInfo.username)
            await chromeInstance.click('#SubmitNext', 5)
            console.log('Submitted username to GWCU')

            await chromeInstance.waitForElement('#PasswordField', 20000)
            await chromeInstance.type('#PasswordField', bankInfo.password)
            await chromeInstance.click('#SubmitNext', 5)
            console.log('Submitted password to GWCU')

            await chromeInstance.waitForElement('span[name="OptionMenu"]', 30000)
            await chromeInstance.click('span[name="OptionMenu"]', 3)
            await chromeInstance.click('a:contains("Download to Quicken - QFX")', 3)
            console.log('Navigated to Quicken export.')

            await chromeInstance.waitForElement('#String0Field')
            await chromeInstance.typeKeyCode('#String0Field', Chrome.DELETE_KEY, 10)
            await chromeInstance.type('#String0Field', '05/01/2017')
            await chromeInstance.typeKeyCode('#String1Field', Chrome.DELETE_KEY, 10)
            await chromeInstance.type('#String1Field', '05/15/2017')
            await chromeInstance.typeKeyCode('#String1Field', Chrome.TAB_KEY)
            await chromeInstance.delay(200)
            await chromeInstance.click('#SubmitDownload', 3)
            console.log('Successfully downloaded transactions.')

            let cookies = await chromeInstance.getCookies()
            return {
                success: true,
                cookies: cookies
            }
        } finally {
            // await chromeInstance.close()
        }
    }
}
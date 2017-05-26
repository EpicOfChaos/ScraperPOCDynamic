import {injectable} from "inversify";
import {Chrome} from "./chrome";
import {ConfigService} from "../config/config.service";
const CDP = require('chrome-remote-interface')

@injectable()
export class ChromePoolService {
    constructor(private configService: ConfigService) {}

    /*
    in the future this could use the CDP.List to determine if it should give out another
    instance based on how many are still open. Also many this should explore browser context?
     */
    async getChromeInstance(url:string){
        let target = await CDP.New({
            url: url
        })
        console.log('Created Target')

        let client = await CDP({
            target: target
        })
        await client.Page.enable()

        return new Chrome(target.id, client, CDP, this.configService.config.dataDir)
    }
}
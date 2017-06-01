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
        let targetClient = await CDP({tab: 'ws://localhost:9222/devtools/browser'})
        console.log('new client created.')
        let {Target} = targetClient
        let browserContextResponse = await Target.createBrowserContext({})
        console.log('Created Browser Context' + JSON.stringify(browserContextResponse))
        let targetResponse = await Target.createTarget({
            url: url,
            width: 1280,
            height: 1096,
            browserContextId: browserContextResponse.browserContextId
        })
        console.log('Target Response' + JSON.stringify(targetResponse))

        // let attachResponse = await Target.attachToTarget({
        //     targetId: targetResponse.targetId
        // })
        //
        // console.log('Attach Response' + JSON.stringify(attachResponse))
        //
        // await Target.activateTarget({
        //     targetId: targetResponse.targetId
        // })
        // console.log('Activated Target')
        // let target = await CDP.New({
        //     url: url
        // })
        // console.log('Created Target')
        //
        let targets = await CDP.List()
        console.log(JSON.stringify(targets))
        let client = await CDP({
            target: targets.filter((target) => {
                return target.id = targetResponse.targetId
            })[0]
        })
        await client.Page.enable()
        await client.Runtime.enable()
        await client.Network.enable()

        console.log('Page Enabled')
        return new Chrome(targetResponse.targetId, client, CDP, this.configService.config.dataDir)
    }
}
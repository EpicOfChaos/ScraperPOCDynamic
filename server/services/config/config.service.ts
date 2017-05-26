import {injectable} from "inversify";
import {EnvConfig} from "./config";
import * as dotenv from 'dotenv'

@injectable()
export class ConfigService {
    private _config: EnvConfig

    constructor() {
        dotenv.config({
            path: process.env.DOTENV_PATH || '.env'
        })

        this._config = {
            dataDir: process.env.DATA_DIR
        }
    }

    get config() {
        return this._config
    }
}
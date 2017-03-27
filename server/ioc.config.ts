import {TestService} from './services/test/test.service'
import {GoogleScraper} from 'google-module-poc'

let services: any[] = [
    TestService,
    GoogleScraper
]

export const DIList = [...services]
import {injectable} from 'inversify'
import {GoogleScraper} from 'google-module-poc'

@injectable()
export class TestService {
    constructor(private googleScraper: GoogleScraper) {}

    health(){
        return this.googleScraper.doIt()
    }

    prime(n: number) {
        if(n <= 1){
            return false
        }else if(n <= 3){
            return  true
        }else if(n % 2 == 0 || n % 3 == 0){
            return false
        }

        let i = 5
        while (i * i <= n) {
            if(n % i == 0 || n % (i+2) == 0){
                return false
            }
            i = i + 6
        }
        return true
    }
}
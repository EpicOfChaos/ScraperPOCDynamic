const CDP = require('chrome-remote-interface')
import {injectable} from "inversify"
import * as _ from 'lodash'
const delay = require('timeout-as-promise')


@injectable()
export class ChromiumTest {
    constructor() {}

    async test(){
        return new Promise((resolve, reject) => {
            CDP(async (client:any) => {
                // Extract used DevTools domains.
                const {Page, Runtime, Input} = client
                await Page.enable()
                await Page.navigate({url: 'http://www.ask.com/'})
                await this.pageLoaded(Page)

                console.log('Lets do stuff')
                await this.type(Runtime, Input, 'input[name="q"]', 'epicpockets.net')
                await this.click(Runtime, Input, '#PartialHome-form .sb-button')
                await this.waitForElement(Runtime,'.PartialSearchResults-item-title')
                let count = await this.count(Runtime, '.PartialSearchResults-item-title')
                client.close()
                console.log('Results: ' + count)
                resolve(count)
            }).on('error', (err:any) => {
                console.error('Cannot connect to browser:', err)
                reject(err)
            })
        })

    }

    async count(Runtime: any, selector:string) {
        return this.executeJQuery(Runtime, `$('${selector}').length`)
    }

    async executeJQuery(Runtime:any, jqueryStatement: string){
        let evalResult = await Runtime.evaluate({expression: jqueryStatement, returnByValue: true})
        console.log(evalResult)
        return evalResult.result.value
    }

    async pageLoaded(Page: any){
        return new Promise((resolve, reject) => {
            Page.loadEventFired(() => {
                console.log('Page Loaded')
                return resolve()
            })
        })
    }

    async type(Runtime: any, Input: any, selector:string, value: string){
        await this.executeJQuery(Runtime, `$('${selector}').focus()`)
        let letters = value.split('')
        for(let letter of letters){
            await Input.dispatchKeyEvent({
                type: 'keyDown',
                text: letter
            })
            await Input.dispatchKeyEvent({
                type: 'keyUp',
                text: letter
            })
        }
        return await this.executeJQuery(Runtime, `$('${selector}')[0].value`)
    }

    async click(Runtime: any, Input: any, selector: string){
        let button = await this.executeJQuery(Runtime, `$('${selector}').offset()`)
        let x = Math.ceil(button.left)
        let y = Math.ceil(button.top)

        let clickEvent:any = {
            x: x,
            y: y,
            button: 'left',
            clickCount: 1
        }
        let mouseDownEvent = _.clone(clickEvent)
        mouseDownEvent.type = 'mousePressed'

        let mouseUpEvent = _.clone(clickEvent)
        mouseUpEvent.type = 'mouseReleased'
        console.log(mouseDownEvent)
        await Input.dispatchMouseEvent(mouseDownEvent)
        await Input.dispatchMouseEvent(mouseUpEvent)
    }

    async waitForElement(Runtime: any, selector: string, maxWait:number = 5000, interval: number = 100){
        let waitDuration = 0
        do {
            let response = await this.executeJQuery(Runtime,`$('${selector}').length`)
            if(response > 0){
                return
            }
            console.log(`Waiting for ${selector} ${waitDuration}/${maxWait}`)
            await delay(interval)
            waitDuration += interval
        } while(waitDuration < maxWait)
        throw new Error('Timeout waiting for element: ' + selector)
    }
}
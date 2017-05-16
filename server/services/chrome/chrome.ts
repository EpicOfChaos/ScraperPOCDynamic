const delay = require('timeout-as-promise')
import * as _ from 'lodash'

export class Chrome {
    private Page: any
    private Runtime: any
    private Input: any

    constructor(private targetId: string,
                private client: any,
                private CDP: any) {
        let {Page, Runtime, Input} = client
        this.Page = Page
        this.Runtime = Runtime
        this.Input = Input
    }

    async count(selector:string) {
        return this.executeJQuery(`$('${selector}').length`)
    }

    async executeJQuery(jqueryStatement: string){
        let evalResult = await this.Runtime.evaluate({expression: jqueryStatement, returnByValue: true})
        return evalResult.result.value
    }

    async pageLoaded(){
        return new Promise((resolve, reject) => {
            this.Page.loadEventFired(() => {
                return resolve()
            })
        })
    }

    async type(selector:string, value: string){
        await this.executeJQuery(`$('${selector}').focus()`)
        let letters = value.split('')
        for(let letter of letters){
            await this.Input.dispatchKeyEvent({
                type: 'keyDown',
                text: letter
            })
            await this.Input.dispatchKeyEvent({
                type: 'keyUp',
                text: letter
            })
        }
        return await this.executeJQuery(`$('${selector}')[0].value`)
    }

    async click(selector: string){
        let button = await this.executeJQuery(`$('${selector}').offset()`)
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

        await this.Input.dispatchMouseEvent(mouseDownEvent)
        await this.Input.dispatchMouseEvent(mouseUpEvent)
    }

    async waitForElement(selector: string, maxWait:number = 5000, interval: number = 100){
        let waitDuration = 0
        do {
            let response = await this.executeJQuery(`$('${selector}').length`)
            if(response > 0){
                return
            }

            await delay(interval)
            waitDuration += interval
        } while(waitDuration < maxWait)
        throw new Error('Timeout waiting for element: ' + selector)
    }


    async close(){
        await this.CDP.Close({id: this.targetId})
    }
}
import {TestService} from './test.service'
import {expect} from 'chai'
import * as sinon from 'sinon'

describe('TestService', () => {
    let testService:TestService
    let mockGoogleScraper: any
    beforeEach(() => {
        mockGoogleScraper = {}
        testService = new TestService(mockGoogleScraper)
    })

    describe('#health', () => {
        beforeEach(( )=> {
            mockGoogleScraper.doIt = sinon.stub().returns('OK')
        })
        it('should return "OK"', () => {
            expect(testService.health()).to.eql('OK')
        })
    })

    describe('#prime', () => {
        [
            {
                input: -1,
                output: false
            },
            {
                input: 0,
                output: false
            },
            {
                input: 1,
                output: false
            },
            {
                input: 2,
                output: true
            },
            {
                input: 3,
                output: true
            },
            {
                input: 101,
                output: true
            },
            {
                input: 821,
                output: true
            },
            {
                input: 997,
                output: true
            }
        ].forEach((testCase) => {
            context('Input: ' + testCase.input, () => {
                it('should return: ' + testCase.output, () => {
                    expect(testService.prime(testCase.input)).to.eql(testCase.output)
                })
            })
        })
    })
})
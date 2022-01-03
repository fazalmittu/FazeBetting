const { assert } = require("chai");
const _deploy_contracts = require("../migrations/2_deploy_contracts");

const bet = artifacts.require("./bet.sol");

contract('bet', (accounts) => {
    let Bet

    before(async () => {
        Bet = await bet.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await Bet.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

    })
})
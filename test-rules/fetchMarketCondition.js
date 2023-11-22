require('dotenv').config()
const fetch = require('isomorphic-fetch');
const domain = process.env.DOMAIN;
const marketconditiontype = [0,1];
const marketIds = ["3112534167"];
const server = process.env.API_SERVER;

const { generalRuleForAll } = require('../generalRule.js');

async function fetchMarket(){
    let i;
    for (i=0;i < marketconditiontype.length;i++){
        const marketConditionRule = {
            data: {
                ...generalRuleForAll,
                name: `Testing Market Condition Rule Field With Value ${marketconditiontype[i]}`,
                market_condition_type: marketconditiontype[i]
            }
        }

        const marketConAllowedRegions = {
            data: {
                ...generalRuleForAll,
                name: `Testing Market Condition Rule With Allowed Regions`,
                market_condition_type: 1,
                market_ids: marketIds
            }
        }


        const sendRequest = await fetch(`${server}/cp/rules/add?domain=${domain}`,{
            method: 'put',
            body: JSON.stringify(marketConditionRule),
            headers: {'Content-Type':'application/json'}
        })
        const responseData = await sendRequest.json();
        console.log(`Response for Market Condition Created Rules: ${JSON.stringify(responseData)}`)


        const sendRequestWithRegions = await fetch(`${server}/cp/rules/add?domain=${domain}`,{
            method: 'put',
            body: JSON.stringify(marketConAllowedRegions),
            headers: {'Content-Type':'application/json'}
        })
        const responseDataRegions = await sendRequestWithRegions.json();
        console.log(`Response for Market Condition - With Regions Created Rules: ${JSON.stringify(responseDataRegions)}`)

    }
}
fetchMarket();
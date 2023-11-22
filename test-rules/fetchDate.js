const fetch = require('isomorphic-fetch');
const domain = "test-tram-store-3.myshopify.com";
const startDate = [null, "2023-11-21T17:00:00.000Z"];
const endDate = [null, "2024-08-29T17:00:00.000Z"];
const server = "https://test-b2b-solution-api-21.test-bsscommerce.com"

const {
    generalRuleForAll
} = require('../generalRule.js');

async function dateNoValue(){

        const dateEmptyRule = {
            data: {
            ...generalRuleForAll,
            name:`Testing Date Fields With No Value`,
            start_date: startDate[0],
            end_date: endDate[0]
        }}

        const responseNoDate = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(dateEmptyRule),
            headers: { 'Content-Type': 'application/json' }
        });
        const responseNoDateData = await responseNoDate.json();
    
        console.log(`Response for Date With No Value Created Rules: ${JSON.stringify(responseNoDateData)}`);
}

dateNoValue();


async function dateValue(){

        const dateValueRule = {data: {
            ...generalRuleForAll,
            name:`Testing Date Fields With Value`,
            start_date: startDate[1],
            end_date: endDate[1]
        }}
        const responseDateValue = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(dateValueRule),
            headers: { 'Content-Type': 'application/json' }
        });
        const responseDateValueData = await responseDateValue.json();
    
        console.log(`Response for Date With Value Created Rules: ${JSON.stringify(responseDateValueData)}`);
}

dateValue();
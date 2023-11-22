require('dotenv').config()
const fetch = require('isomorphic-fetch');
const domain = process.env.DOMAIN;
const exclude = [0,1,2];
const excludeCustomer = [5619738050711,5894117458071,5962332340375];
const excludeTags = ["test","tramtest"];
const server = process.env.SERVER;

const {
    generalRuleForAll
} = require('../generalRule.js');

async function fetchExclude(){
    let i;
    for (i=0; i < exclude.length; i++){
        const excludeRules = {
            data: {
                ...generalRuleForAll,
                name: `Testing Exclude Fields With Value ${exclude[i]}`,
                exclude_from: exclude[i]
            }
        }

        const sendRequest = await fetch(`${server}/cp/rules/add?domain=${domain}`,{
            method:'put',
            body:JSON.stringify(excludeRules),
            headers: {'Content-Type':'application/json'}
        })
        const responseExclude = await sendRequest.json();
        console.log(`Response to Exclude Fields Created Rules: ${JSON.stringify(responseExclude)}`);

    }
}

fetchExclude();

async function fetchExcludeValue(){
    const excludeCustomersRule = {
        data: {
            ...generalRuleForAll,
            name: "Testing Exclude Fields with Excluded Customer Ids",
            exclude_from: 2,
            exc_customers: excludeCustomer
        }
    }
    const excludeTagsRule = {
        data: {
            ...generalRuleForAll,
            name: "Testing Exclude Fields with Excluded Tags",
            exclude_from: 1,
            exc_customer_tags: excludeTags
        }
    }

    const sendRequest = await fetch(`${server}/cp/rules/add?domain=${domain}`,{
        method:'put',
        body:JSON.stringify(excludeCustomersRule),
        headers: {'Content-Type':'application/json'}
    })
    const responseExcludeCustomerData = await sendRequest.json();

    console.log(`Response to Exclude Fields With Customer Ids Created Rule: ${JSON.stringify(responseExcludeCustomerData)}`);

    const sendRequestTags = await fetch(`${server}/cp/rules/add?domain=${domain}`,{
        method:'put',
        body:JSON.stringify(excludeTagsRule),
        headers: {'Content-Type':'application/json'}
    })
    const responseExcludeTagData = await sendRequestTags.json();
    console.log(`Response to Exclude Fields With Customer Tags Created Rule: ${JSON.stringify(responseExcludeTagData)}`);

}
fetchExcludeValue();

require('dotenv').config()
const fetch = require('isomorphic-fetch');
const domain = process.env.DOMAIN;
const applyto = [0, 1, 2, 3, 4];
const customerIds = [5906002247831,5962332340375];
const customerTags = ["BSS_TAG","HAHAnowIgotyou"];
const server = process.env.SERVER;

const {
    generalRuleForAll
} = require('../generalRule.js');

async function fetchApplyTo() {
    let i;
    for (i = 0; i < applyto.length; i++) {
        const applyToRule = {
            data: {
                ...generalRuleForAll,
                name: `Testing Apply_To Field With Value ${applyto[i]}`,
                apply_to: applyto[i]
            }
        }
        const response = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(applyToRule),
            headers: { 'Content-Type': 'application/json' }
        });
        const responseApplyToData = await response.json();

        console.log(`Response For Apply To Fields Created Rules: ${JSON.stringify(responseApplyToData)}`);
    }
}
fetchApplyTo();

async function fetchApplyToWithValue (){
    const applyToRuleCustomer = {
        data:{
            ...generalRuleForAll,
            name: "Testing Apply_To Field With Customer Id",
            apply_to: 3,
            customer_ids: customerIds
        }
    }

    const applyToRuleTag = {
        data: {
            ...generalRuleForAll,
            name: "Testing Apply_To Field With Customer Tag",
            apply_to: 4,
            customer_tags: customerTags
        }
    }

    const responseCustomer = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(applyToRuleCustomer),
            headers: { 'Content-Type': 'application/json' }
    });
    const responseApplyToCustomer = await responseCustomer.json();
    const responseTag = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(applyToRuleTag),
            headers: { 'Content-Type': 'application/json' }
    });
    const responseApplyToTag = await responseTag.json();
    console.log(`Response to Apply To Fields Create Rule - With Customer Ids: ${JSON.stringify(responseApplyToCustomer)}`);
    console.log('Response to Apply To Fields Create Rule - With Customer Tags: ' + JSON.stringify(responseApplyToTag));
}
fetchApplyToWithValue();
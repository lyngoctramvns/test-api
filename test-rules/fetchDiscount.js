require('dotenv').config()
const fetch = require('isomorphic-fetch');
const domain = process.env.DOMAIN;
const discount = [0,1,2];
const value = [100,200,700];
const server = process.env.SERVER;

const {
    generalRuleForAll
} = require('../generalRule.js');

async function discountValue(){
    let i;
    for (i = 0; i < discount.length; i++) {
        const discountRules = {data: {
            ...generalRuleForAll,
            name:`Testing Discount Fields With Value ${discount[i]}`,
            discount_type: discount[i],
            discount_value: value[i]
        }}

        const sendRequest = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(discountRules),
            headers: { 'Content-Type': 'application/json' }
        });
        const responseDiscountData = await sendRequest.json();
    
        console.log(`Response for Discount Created Rules: ${JSON.stringify(responseDiscountData)}`);
    }
}

discountValue();

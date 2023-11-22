require('dotenv').config()
const fetch = require('isomorphic-fetch');
const domain = process.env.DOMAIN;
const priority = [0, 1, 4, 40];
const server = process.env.API_SERVER;

const {
    generalRuleForAll
} = require('../generalRule.js');

async function nodePriority(){
    let i;
    for (i = 0; i < priority.length; i++) {
        const bodyPriority = {data: {
            ...generalRuleForAll,
            name:`Testing Priority Fields With Value ${priority[i]}`,
            priority: priority[i]
        }}
        const response = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(bodyPriority),
            headers: { 'Content-Type': 'application/json' }
        });
        const responseData = await response.json();
    
        console.log(`Response for Priority Created Rules: ${JSON.stringify(responseData)}`);
    }
}

nodePriority();

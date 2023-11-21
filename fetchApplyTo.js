import fetch from 'node-fetch';
const domain = "test-tram-store-3.myshopify.com"
const applyto = [0, 1, 2, 3, 4];
const customerIds = [5906002247831,5962332340375];
const customerTags = ["BSS_TAG","HAHAnowIgotyou"];

const generalRule = {
    //import from a general file. File will be generated later
    name: "testApplyto",
    priority: 0,
    status: 1,
    apply_to: 0,
    customer_ids: [],
    customer_tags: [],
    market_condition_type: 0,
    market_ids: [],
    exc_customer_tags: [],
    exc_customers: [],
    product_condition_type: 0,
    product_ids: [],
    product_collections: [],
    product_tags: [],
    product_variants: [],
    discount_type: 0,
    discount_value: 400,
    start_date: null,
    end_date: null,
    exclude_from: 0

}

async function fetchApplyTo() {
    let i;
    for (i = 0; i < applyto.length; i++) {
        const applyToRule = {
            data: {
                ...generalRule,
                name: `Testing Apply_To Field With Value ${applyto[i]}`,
                apply_to: applyto[i]
            }
        }
        const response = await fetch(`https://test-b2b-solution-api-21.test-bsscommerce.com/cp/rules/add?domain=${domain}`, {
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
            ...generalRule,
            name: "Testing Apply_To Field With Customer Id",
            apply_to: 3,
            customer_ids: customerIds
        }
    }

    const applyToRuleTag = {
        data: {
            ...generalRule,
            name: "Testing Apply_To Field With Customer Tag",
            apply_to: 4,
            customer_tags: customerTags
        }
    }

    const responseCustomer = await fetch(`https://test-b2b-solution-api-21.test-bsscommerce.com/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(applyToRuleCustomer),
            headers: { 'Content-Type': 'application/json' }
    });
    const responseApplyToCustomer = await responseCustomer.json();
    const responseTag = await fetch(`https://test-b2b-solution-api-21.test-bsscommerce.com/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(applyToRuleTag),
            headers: { 'Content-Type': 'application/json' }
    });
    const responseApplyToTag = await responseTag.json();
    console.log(`Response to Apply To Fields Create Rule - With Customer Ids: ${JSON.stringify(responseApplyToCustomer)}`);
    console.log('Response to Apply To Fields Create Rule - With Customer Tags: ' + JSON.stringify(responseApplyToTag));
}
fetchApplyToWithValue();
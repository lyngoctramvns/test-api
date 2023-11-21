import fetch from 'node-fetch';
const domain = "test-tram-store-3.myshopify.com"
const applyto = [0, 1, 2, 3, 4];

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
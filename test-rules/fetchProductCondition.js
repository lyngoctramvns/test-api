require('dotenv').config()
const fetch = require('isomorphic-fetch');
const domain = process.env.DOMAIN;
const productConditionType = [0, 1, 2, 3, 4];
const productIds = [6936957485207,6936959418519];
const variantIds = [40265478897815,40265479454871];
const collectionIds = [268841025687,268838961303];
const productTags = ["BSS_PRODUCT_TAG","NEW_PRODUCT_TAG"];
const server = process.env.SERVER;

const {
    generalRuleForAll
} = require('../generalRule.js');

async function fetchProduct() {
    let i;
    for (i = 0; i < productConditionType.length; i++) {
        const productConditionRule = {
            data: {
                ...generalRuleForAll,
                name: `Testing Product_Condition Field With Value ${productConditionType[i]}`,
                product_condition_type: productConditionType[i]
            }
        }


        const response = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(productConditionRule),
            headers: { 'Content-Type': 'application/json' }
        });

        const responseProductData = await response.json();

        console.log(`Response For Product Condition Fields Created Rules: ${JSON.stringify(responseProductData)}`);
    }
}

fetchProduct();



async function fetchProductWithValue (){
    const productRuleSpecific = {
        data:{
            ...generalRuleForAll,
            name: "Testing Product Condition Field With Specific Products",
            product_condition_type: 1,
            product_ids: productIds
        }
    }

    const productRuleVariants = {
        data: {
            ...generalRuleForAll,
            name: "Testing Product Condition Field With Specific Variants",
            product_condition_type: 4,
            product_variants: variantIds
        }
    }

    const productRuleCollections = {
        data: {
            ...generalRuleForAll,
            name: "Testing Product Condition Field With Specific Collections",
            product_condition_type: 2,
            product_collections: collectionIds
        }
    }


    const productRuleTags = {
        data: {
            ...generalRuleForAll,
            name: "Testing Product Condition Field With Specific Tags",
            product_condition_type: 3,
            product_tags: productTags
        }
    }

    const responseProduct = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(productRuleSpecific),
            headers: { 'Content-Type': 'application/json' }
    });
    const responseProductData = await responseProduct.json();

    const responseVariants = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(productRuleVariants),
            headers: { 'Content-Type': 'application/json' }
    });
    const responseVariantData = await responseVariants.json();

    const responseCollections = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(productRuleCollections),
            headers: { 'Content-Type': 'application/json' }
    });
    const responseCollectionData = await responseCollections.json();

    const responseTags = await fetch(`${server}/cp/rules/add?domain=${domain}`, {
            method: 'put',
            body: JSON.stringify(productRuleTags),
            headers: { 'Content-Type': 'application/json' }
    });
    const responseTagData = await responseTags.json();

    console.log(`Response to Product Condition Fields Create Rule - With Specific Products: ${JSON.stringify(responseProductData)}`);
    console.log('Response to Product Condition Fields Create Rule - With Specific Variants: ' + JSON.stringify(responseVariantData));
    console.log('Response to Product Condition Fields Create Rule - With Specific Collections: ' + JSON.stringify(responseCollectionData));
    console.log('Response to Product Condition Fields Create Rule - With Specific Tags: ' + JSON.stringify(responseTagData));
}
fetchProductWithValue();
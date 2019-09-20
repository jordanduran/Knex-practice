const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List Service Object`, function () {
    let db
    let testItems = [
        {
            id: 1,
            name: 'First item',
            date_added: new Date(),
            price: '10.00',
            category: 'Main'
        },
        {
            id: 2,
            name: 'Second item',
            date_added: new Date(),
            price: '15.00',
            category: 'Lunch'
        },
        {
            id: 3,
            name: 'Third item',
            date_added: new Date(),
            price: '5.00',
            category: 'Snack'
        },
        {
            id: 4,
            name: 'Fourth item',
            date_added: new Date(),
            price: '0.75',
            category: 'Breakfast'
        },
    ]
})
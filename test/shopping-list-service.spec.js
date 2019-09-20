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

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        this.beforeEach(() => {
            return db
            .into('shopping_list')
            .insert(testItems)
        })

        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            const expectedItems = testItems.map(item => ({
                ...item,
                checked: false,
            }))
            return ShoppingListService.getAllItems(db)
            .then(actual => {
                expect(actual).to.eql(expectedItems)
            })
        })

        it(`getById() resolves an article by id from 'shopping_list' table`, () => {
            const idToGet = 3
            const thirdItem = testItems[idToGet - 1]
            return ShoppingListService.getById(db, idToGet)
                .then(actual => {
                    expect(actual).to.eql({
                        id: idToGet,
                        name: thirdItem.name,
                        date_added: thirdItem.date_added,
                        price: thirdItem.price,
                        category: thirdItem.category,
                        checked: false,
                })
            })
        })

        it(`deleteItem() removes an article by id from 'shopping_list' table`, () => {
            const articleId = 3
            return ShoppingListService.deleteItem(db, articleId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    // Duplicate the array excluding the removed article
                    const expected = testItems
                        .filter(article => article.id !== articleId)
                        .map(item => ({
                            ...item,
                            checked: false,
                        }))
                        expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an article from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                name: 'updated name',
                price: '50.00',
                date_added: new Data(),
                checked: true,
            }
            const originalItem = testItems[idOfItemToUpdate - 1]
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemId)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(article => {
                    expect(article).to.eql({
                        id: idOfItemToUpdate,
                        ...originalItem,
                        ...newItemData,
                    })
                })
            })
        })

        context(`Given 'shopping_list' has no data`, () => {
            it(`getAllItems() resolves an empty array`, () => {
                return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
            })

            it(`insertItem() inserts an article and resolves the article with an 'id'`, () => {
                const newItem = {
                    name: 'Test name',
                    price: '8.50',
                    date_added: new Date(),
                    checked: true,
                    category: 'Lunch',
                }
                return ShoppingListService.insertItem(db, newItem)
                    .then(actual => {
                        expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: newItem.checked,
                        category: newItem.category,
                })
            })
        })
     })
})



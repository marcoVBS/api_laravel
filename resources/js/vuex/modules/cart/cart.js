export default {
    state: {
        items: []
    },
    mutations: {
        ADD_PRODUCT_CART(state, product){
            state.items.push(product)
        },
        REMOVE_PRODUCT_CART(state, product){
            let index = state.items.findIndex(prod => {
                return prod.id === product.id
            })

            state.items.splice(index, 1)
        }
    }
}
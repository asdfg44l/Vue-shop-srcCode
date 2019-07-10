import axios from 'axios';
import $ from 'jquery';
export default {
    namespaced: true,
    state: {
        cartLength: 0,
        cartInfo: {},
    },
    actions: {
        getCarts(context){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            context.commit('ISLOADING', true, {root : true});
            axios.get(api).then((response) => {  
                context.commit('CARTINFO', response.data.data) ;
                context.commit('CARTLENGTH', response.data.data.carts.length)
                context.commit('ISLOADING', false, {root : true});
            })    
        },
        addtoCart(context, {id, qty=1, src}){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const cart={
                "product_id":id,
                qty,
            }
            if(src === 'accessories'){
                context.commit('STATUS', id, {root : true});
            }else{
                context.commit('STATUS', true, {root : true});
            }
            
            axios.post(api, {data: cart}).then(() => {   
                context.dispatch('getCarts');
                if(src === 'accessories'){
                    context.commit('STATUS', '', {root : true});
                    $("#Accessory").modal("hide");
                }else{
                    context.commit('STATUS', false, {root : true});
                }
            })
        },
        removeCartItem(context, id){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            context.commit('ISLOADING', true, {root : true});
            axios.delete(api).then(() => {  
                context.dispatch('getCarts');
                context.commit('ISLOADING', false, {root : true});
            })
        },
    },
    mutations: {
        CARTINFO(state, payload) {
            state.cartInfo= payload;
        },
        CARTLENGTH(state, payload) {
            state.cartLength= payload;
        },
    },
    getters: {
        cartLength: state => state.cartLength,
        cartInfo: state => state.cartInfo,
    }
}
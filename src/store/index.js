import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';


Vue.use(Vuex)

import cartModules from './cart';

export default new Vuex.Store({
    state:{
        isLoading: false,
        Accessories: [],
        filterData:[],
        motocycles: [],
        cart_id:"",
        status:{
            loadingItem:false,
        }
    },
    actions:{
        getProducts(context, type){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            context.commit('ISLOADING', true);
            axios.get(api).then((response) => { 
                const datalist=response.data.products.filter((item) =>{
                    return item.category === type;
                });
                if(type === '選購配件'){
                    context.commit('ACCESSORIES', datalist);
                    context.commit('FILTERDATA', datalist);
                }else{
                    context.commit('MOTOCYCLES', datalist);
                    context.commit('CARTID', datalist[3].id);
                }
                context.commit('ISLOADING', false);
                
            })
        },
        // accessories
        filterItem(context, filter){
            const datalist= context.state.Accessories.filter((item) =>{
                return item.description === filter;
            });
            context.commit('FILTERDATA', datalist)
        },
    },
    mutations:{
        ISLOADING(state, payload) {
            state.isLoading= payload;
        },
        ACCESSORIES(state, payload) {
            state.Accessories= payload;
        },
        FILTERDATA(state, payload) {
            state.filterData= payload;
        },
        MOTOCYCLES(state, payload) {
            state.motocycles= payload;
        },
        CARTID(state, payload) {
            state.cart_id= payload;
        },
        STATUS(state, payload){
            state.status.loadingItem= payload;
        }
    },
    getters: {
        isLoading: state => state.isLoading,
        Accessories: state => state.Accessories,
        filterData: state => state.filterData,
        motocycles: state => state.motocycles,
        cartId: state => state.cart_id,
        status: state => state.status,
    },
    modules: {
        cartModules,
    }
})
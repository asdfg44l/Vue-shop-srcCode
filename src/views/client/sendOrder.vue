<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <keep-alive>
                <userform @ordersent="sendOrder = true" v-if="!sendOrder" :cartInfo="cartInfo"></userform>
            </keep-alive>
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import userform from '@/components/client/userData'
export default {
    data(){
        return{    
            sendOrder:false,
            cartInfo:{}
        };
    },
    components:{
        userform,
    },
    methods: {
        getCarts(){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm=this;
            vm.$http.get(api).then((response) => {  
                vm.cartInfo= response.data.data;
            })    
        },
    }, 
    created() {
        this.getCarts();
    },
}
</script>
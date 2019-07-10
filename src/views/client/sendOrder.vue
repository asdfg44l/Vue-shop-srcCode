<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <keep-alive>
                <userform @ordersent="sendOrder = true" v-if="!sendOrder" ></userform>
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
        };
    },
    components:{
        userform,
    },
}
</script>
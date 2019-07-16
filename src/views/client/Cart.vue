<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <Navbar></Navbar>
        <div class="container">
            <div class="row mt-3">
                <div class="col-md-8" >
                    <h3 class="text-center py-3 text-white bg-info">購物車</h3>
                    <h5 class="text-danger font-sm">*以下金額單位為美金</h5>
                    <div class="cart-list container-fluid py-3" v-for="data in cartInfo.carts" :key="data.id">
                        <div class="d-flex justify-content-around flex-column flex-md-row">
                            <div class="d-flex flex-fill py-2">
                                <div class="cart-pic bg-cover" :style='`background-image: url(${data.product.imageUrl});`'></div>
                                <div class="cart-content flex-fill d-flex flex-column flex-md-row align-items-start justift-content-around align-items-md-center text-sweet ml-3 ml-md-0">
                                    <div class="cart-title ml-0 ml-md-5 font-lg">
                                        <p class="font-big">{{ data.product.title }}</p>
                                        <p>{{ data.total }}</p>
                                    </div>
                                    <div class="num ml-md-auto mr-md-5">
                                        {{ data.qty }} {{ data.product.unit }}
                                    </div>
                                </div>
                            </div> 
                            <div class="total-price d-flex py-2 border-sweetlight align-items-center justify-content-end justify-content-md-around" >
                                <span class="h4 text-sweet text-center font-weight-bold mb-0 mr-md-2">{{ data.total | currency }}</span>
                                <button class="btn btn-outline-danger d-none d-md-inline" @click="removeCartItem(data.id)">
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <h5 class="text-danger font-sm my-3">可以輸入 "VIP"這張優惠券</h5>
                    <div class="input-group my-3">
                        <input type="text" class="form-control" v-model="coupon" placeholder="請輸入優惠碼">
                        <div class="input-group-append">
                            <button @click="addCoupon" type="button" class="btn btn-sm btn-outline-primary" >套用優惠碼</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <h3 class="text-center py-3 text-white bg-info">訂單明細</h3>
                    <h5 class="text-danger font-sm">*以下金額單位為美金</h5>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>原價</td>
                                <td class="text-right">{{ cartInfo.total | currency }}</td>
                            </tr>
                            <tr v-if="cartInfo.total !== cartInfo.final_total">
                                <td class="border-0">折扣金額</td>
                                <td class="text-right text-danger border-0">- {{ (cartInfo.total - cartInfo.final_total) | currency }}</td>
                            </tr>
                            <tr>
                                <td class="font-lg border-0">小計</td>
                                <td class="text-right font-lg border-0">{{ cartInfo.final_total | currency }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <router-link to="/sendOrder" class="btn btn-block btn-outline-info">確認結帳</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    data(){
        return {
            coupon:"",
        };
    },
    methods: {
        removeCartItem(id){
            this.$store.dispatch('cartModules/removeCartItem', id);
        },
        getCarts(){
            this.$store.dispatch('cartModules/getCarts');  
        },
        addCoupon(){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
            const vm=this;
            const coupon={
                "code": vm.coupon
            }
            vm.$store.commit("ISLOADING", true);
            vm.$http.post(api, {data: coupon}).then(() => {   
                vm.getCarts();
                vm.$store.commit("ISLOADING", false);
            })
        },
    },
    computed: {
        ...mapGetters(["isLoading"]),
        ...mapGetters("cartModules", ["cartInfo"]),
    },
    created() {
        this.getCarts();
    },
}
</script>

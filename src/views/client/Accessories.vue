<template>
   <div>
        <loading :active.sync="isLoading"></loading>
        <Navbar></Navbar>
        <div class="bg-dark">
            <div class="d-flex justify-content-center align-items-center py-3">
                <h3 class="text-white font-weight-bold font-lg mb-0">選購配備</h3>
                <p class="text-white mb-0 ml-3">大型重車</p>
            </div>
        </div>
        <div class="jumbotron accessBanner jumbotron-fluid"></div>

        <div class="container-fluid accessoryDemo my-5">
            <div class="row">
                <div class="col-lg-6">
                    <div class="sticky-top">
                       <div class="demo mb-3">
                            <div class="partIntro glass">
                                <button class="btn" @click="filterItem('glass')">
                                    <div class="border border-danger rounded-circle text-white bg-danger">
                                        <div class="partDot text-center font-weight-bold">+</div>
                                    </div>
                                </button>
                                <p class="border border-second rounded-pill font-sm text-white bg-dark mb-0 px-2">擋風鏡</p>
                            </div>
                            <div class="partIntro containBox">
                                <button class="btn" @click="filterItem('sidebox')">
                                    <div class="border border-danger rounded-circle text-white bg-danger">
                                        <div class="partDot text-center font-weight-bold">+</div>
                                    </div>
                                </button>
                                <p class="border border-second rounded-pill font-sm text-white bg-dark mb-0 px-2">側邊置物箱</p>
                            </div>
                            <div class="partIntro turbo">
                                <button class="btn" @click="filterItem('turbo')">
                                    <div class="border border-danger rounded-circle text-white bg-danger">
                                        <div class="partDot text-center font-weight-bold">+</div>
                                    </div>
                                </button>
                                <p class="border border-second rounded-pill font-sm text-white bg-dark mb-0 px-2">渦輪改裝</p>
                            </div>
                            <div class="partIntro seat">
                                <button class="btn" @click="filterItem('seat')">
                                    <div class="border border-danger rounded-circle text-white bg-danger">
                                        <div class="partDot text-center font-weight-bold">+</div>
                                    </div>
                                </button>
                                <p class="border border-second rounded-pill font-sm text-white bg-dark mb-0 px-2">客制化坐墊</p>
                            </div>
                        </div> 
                    </div>  
                </div>
                <div class="col-lg-6">
                    <div class="row" v-if="filterData">
                        <div class="col-md-4 col-lg-6 mb-2" v-for="item in filterData" :key="item.id"> 
                            <div class="card h-100">
                                <img :src="`${item.imageUrl}`" class="card-img-top" style="height:200px;">
                                <div class="card-body">
                                    <h5 class="card-title">{{ item.title }}</h5>
                                    <p :class='{"text-line-through" : item.price !== item.origin_price, "text-info" : item.price == item.origin_price }'>原價: {{ item.origin_price }}</p>
                                    <strong v-if="item.price !== item.origin_price" class="text-danger">特價: {{ item.price }}</strong>
                                </div>
                                
                                <button type="button" class="btn btn-block btn-info btn-sm" @click="addtoCart(item)">
                                    <i class="fas fa-shopping-basket"></i>
                                    加入購物車
                                    <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>

        <!--Accessories-modal-->
        <div class="modal" id="Accessories" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">購物車訊息</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body font-lg">
                    <p>商品 <span class="text-primary" v-text="product.title"></span> 已加入購物車</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div> 
   </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            product:{},
        };
    },

    methods:{
        getAccessories(){
            this.$store.dispatch('getProducts', '選購配件');
        },
        filterItem(filter){
            this.$store.dispatch('filterItem', filter);
        },
        addtoCart(item, qty=1){
            var src= 'accessories';
            var id = item.id;
            this.$store.dispatch("cartModules/addtoCart", {id, qty, src})
            this.product = item;
        },
    },
    computed: {
        ...mapGetters(["isLoading", 'Accessories', 'filterData', 'status'])
    },
    created() {
        this.getAccessories();  
    },
}
</script>

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
                    <div class="row">
                        <div class="col-md-4 col-lg-6 mb-2" v-if="filterData" v-for="item in filterData" :key="item.id"> 
                            <div class="card h-100">
                                <img :src="`${item.imageUrl}`" class="card-img-top" style="height:200px;">
                                <div class="card-body">
                                    <h5 class="card-title">{{ item.title }}</h5>
                                    <p class="text-primary">原價: {{ item.origin_price }}</p>
                                    <strong v-if="item.price !== item.origin_price" class="text-danger">特價: {{ item.price }}</strong>
                                </div>
                                <div class="p-3 d-flex justify-content-between">
                                  <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem"></i>
                                    查看詳情
                                  </button>
                                  <button type="button" class="btn btn-outline-info btn-sm" @click="addtoCart(item.id)">
                                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem"></i>
                                    加入購物車
                                  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>

        <!--Accessories-modal-->
        <div class="modal fade" id="Accessory" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="product">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                        <p class="mb-0">{{ product.content }}</p>
                        <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h4" v-if="!product.price">{{ product.origin_price }} USD</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price }} USD</del>
                    <div class="h4" v-if="product.price">現在只要 {{ product.price }} USD</div>
                    </div>
                    <select name="number" class="form-control mt-3" v-model="product.num">
                        <option :value="num" v-for="num in 10" :key="num">
                            選購 {{num}} {{product.unit}}
                        </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                    小計 <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary"
                    @click="addtoCart(product.id, product.num)">
                        <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                        加到購物車
                    </button>
                </div>
                </div>  
            </div>  
        </div>  
   </div>
</template>

<script>
import $ from 'jquery'

export default {
    data(){
        return {
            Accessories:[],
            filterData:[],
            product:{},
            status:{
                loadingItem:"",
            },
        };
    },

    methods:{
        getAccessories(page=1){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
            const vm=this;
            vm.isLoading=true;
            vm.$http.get(api).then((response) => { 
                vm.Accessories=response.data.products.filter((item) =>{
                    return item.category === '選購配件';
                });
                vm.isLoading=false;
                vm.filterData = vm.Accessories;
            })
        },
        filterItem(filter){
            var vm= this;
            vm.filterData= vm.Accessories.filter((item) =>{
                return item.description === filter;
            });
        },
        addtoCart(id, qty=1){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm=this;
            const cart={
                "product_id":id,
                qty,
            }
            vm.status.loadingItem=id;
            vm.$http.post(api, {data: cart}).then((response) => {   
                vm.product=response.data.product;
                $("#Accessory").modal("hide");
                vm.status.loadingItem="";
            })
        },
        getProduct(id){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            const vm=this;
            vm.status.loadingItem=id;
            vm.$http.get(api).then((response) => {      
                vm.product=response.data.product;
                $("#Accessory").modal("show");
                vm.status.loadingItem="";
            })
        },
    },

    created() {
        const vm= this;
        vm.getAccessories();  
    },
}
</script>

<template>
   <div>
        <Navbar></Navbar>
        <div class="container-fluid my-3">
            <div id="Motocyclecarousel" class="carousel slide" data-pause="hover">  
                <div class="carousel-inner">
                    <div class="carousel-item active" data-content="sv650">
                        <img src="~@/assets/img/tiny/sv650-01.svg"  class="d-block mx-auto">
                    </div>
                    <div class="carousel-item" data-content="modern">
                        <img src="~@/assets/img/tiny/modern.jpg"  class="d-block mx-auto">
                    </div>
                    <div class="carousel-item" data-content="fierex">
                        <img src="~@/assets/img/tiny/fierex.jpg"  class="d-block mx-auto">
                    </div>
                    <div class="carousel-item" data-content="elegant">
                        <img src="~@/assets/img/tiny/elegant.jpg"  class="d-block mx-auto">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#Motocyclecarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon text-info bg-none" aria-hidden="true">
                        <i class="fas fa-chevron-left fa-2x"></i>
                    </span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#Motocyclecarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon text-info bg-none" aria-hidden="true">
                        <i class="fas fa-chevron-right fa-2x"></i>
                    </span>
                    <span class="sr-only">Next</span>
                </a>
                <div class="motoIntro d-flex justify-content-center">
                    <ol class="carousel-indicators justify-content-end mx-0 d-none d-md-flex">
                        <li data-target="#Motocyclecarousel" data-slide-to="0" class="active">01</li>
                        <li data-target="#Motocyclecarousel" data-slide-to="1">02</li>
                        <li data-target="#Motocyclecarousel" data-slide-to="2">03</li>
                        <li data-target="#Motocyclecarousel" data-slide-to="3">04</li>
                    </ol>
                    <ul class="infoList nav mx-auto" v-if="currentPic">
                        <li class="nav-item mx-3 mx-md-3">
                            <h3 class="introTitle">Category</h3>
                            <p class="introContent switch switchIn">{{ currentPic.category }}</p>
                        </li>
                        <li class="nav-item mx-3 mx-md-3">
                            <h3 class="introTitle">CYLINDER CAPACITY</h3>
                            <p class="introContent switch switchIn">{{ currentPic.capacity }} CC</p>
                        </li>
                        <li class="nav-item mx-3 mx-md-3">
                            <h3 class="introTitle">POWER</h3>
                            <p class="introContent switch switchIn">{{ currentPic.power }} ps</p>
                        </li>
                        <li class="nav-item mx-3 mx-md-3">
                            <h3 class="introTitle">WEIGHT</h3>
                            <p class="introContent switch switchIn">{{ currentPic.weight }} KG</p>
                        </li>
                        <li class="nav-item mx-3 mx-md-3">
                            <h3 class="introTitle">PRICE</h3>
                            <p class="introContent switch switchIn">$12,000 USD</p>
                        </li>
                    </ul>
                    <div class="motoAddCart mr-lg-3">
                        <button type="button" @click.prevent="addtoCart()" class="btn btn-info d-none d-md-inline rounded-pill">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem"></i>
                            加入購物車
                            <i class="fas fa-plus"></i>
                        </button>
                        <button type="button" @click.prevent="addtoCart()" class="btn btn-info d-inline d-md-none rounded-0">
                            <i class="fas fa-shopping-basket"></i>
                        </button>
                    </div>           
                </div>
            </div>
        </div>
   </div>
    
</template>

<script>
import $ from 'jquery'

import { mapGetters } from "vuex"
export default {
    data(){
        return {
            motoFormate: {
                sv650:{
                    category: "Street",
                    capacity: "645",
                    power: "76",
                    weight: "195",
                },
                elegant:{
                    category: "elegant",
                    capacity: "847",
                    power: "92",
                    weight: "193"
                },
                modern:{
                    category: "modern",
                    capacity: "321",
                    power: "41",
                    weight: "170"
                },
                fierex:{
                    category: "fierex",
                    capacity: "847",
                    power: "92",
                    weight: "215"
                }
            },
            currentPic: {},
            infoChanging: true,
        };
    },
    methods: {
        getMotocycles(){
            this.$store.dispatch('getProducts', "大型重機");
        },
        addtoCart(id= this.$store.state.cart_id , qty=1){
           this.$store.dispatch("cartModules/addtoCart", {id, qty});
        },
    },
    computed: {
        ...mapGetters(["status"]),
    },
    created() {
        this.getMotocycles();   
        this.currentPic= this.motoFormate.sv650;
    },
    mounted(){
        const vm= this;
        var storeState= this.$store.state;
        //隨著圖片更換變更商品 id 以及商品資訊
        $('#Motocyclecarousel').on('slide.bs.carousel', function (event) {
           var name= event.relatedTarget.dataset['content'];
           $(".introContent").removeClass("switchIn");
           if(storeState.motocycles){
               const currentItem= storeState.motocycles.find((item) => {
                   return item.description === name ;
               });
               vm.$store.commit('CARTID', currentItem.id);             
           }
           setTimeout(function(){
               $(".introContent").addClass("switchIn");
           },500)
           vm.currentPic= vm.motoFormate[name];
        })
    },
}
</script>
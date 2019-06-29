<template>
   <div>
        <Navbar></Navbar>
        <div class="container-fluid">
            <div class="mainLogo py-5 mx-auto"></div>
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
                    <div class="motoAddCart">
                        <button type="button" @click.prevent="addtoCart(1)" class="btn btn-outline-info">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem"></i>
                            加入購物車
                        </button>
                    </div>
                    <ul class="nav mx-auto" v-if="currentPic">
                        <li class="nav-item mx-4">
                            <h3 class="introTitle">Category</h3>
                            <p class="introContent">{{ currentPic.category }}</p>
                        </li>
                        <li class="nav-item mx-4">
                            <h3 class="introTitle">CYLINDER CAPACITY</h3>
                            <p class="introContent">{{ currentPic.capacity }} CC</p>
                        </li>
                        <li class="nav-item mx-4">
                            <h3 class="introTitle">POWER</h3>
                            <p class="introContent">{{ currentPic.power }} ps</p>
                        </li>
                        <li class="nav-item mx-4">
                            <h3 class="introTitle">WEIGHT</h3>
                            <p class="introContent">{{ currentPic.weight }} KG</p>
                        </li>
                        <li class="nav-item mx-4">
                            <h3 class="introTitle">PRICE</h3>
                            <p class="introContent">$12,000 USD</p>
                        </li>
                    </ul>
                    <ol class="carousel-indicators justify-content-end mx-0 d-none d-md-flex">
                        <li data-target="#Motocyclecarousel" data-slide-to="0" class="active">01</li>
                        <li data-target="#Motocyclecarousel" data-slide-to="1">02</li>
                        <li data-target="#Motocyclecarousel" data-slide-to="2">03</li>
                        <li data-target="#Motocyclecarousel" data-slide-to="3">04</li>
                    </ol>
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
            motocycles:{},
            motoFormate:{
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
            currentPic:{},
            cart_id:"",
            status:{
                loadingItem:false,
            }
        };
    },
    methods: {
        getMotocycles(){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            const vm=this;
            vm.$http.get(api).then((response) => {   
                var datas= response.data.products;
                for( let item in datas){
                    if( datas[item].category === "大型重機"){
                        vm.motocycles[datas[item].description]= datas[item];
                    }
                }
                //初始 ID
                vm.cart_id= vm.motocycles['sv650'].id;
            })
        },
        addtoCart( qty=1){
            const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm=this;
            const cart={
                "product_id":"-Li8J6-1Zh7r9eN2aday",
                qty,
            }
            vm.status.loadingItem=true;
            vm.$http.post(api, {data: cart}).then(() => {   
                vm.status.loadingItem=false;
            })
        },
    },
    created() {
        this.getMotocycles();   
        this.currentPic= this.motoFormate.sv650;
    },
    mounted(){
        const vm= this;
        $('#Motocyclecarousel').on('slide.bs.carousel', function (event) {
           var name= event.relatedTarget.dataset['content'];
           if(vm.motocycles){
               vm.cart_id= vm.motocycles[name].id;
           }
           vm.currentPic= vm.motoFormate[name];
        })   
    },
}
</script>
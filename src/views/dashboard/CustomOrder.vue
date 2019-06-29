<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-3">
      <div class="col-md-4 mb-4" v-for="item in products" ::key="item.id">
        <div class="card border-0 shadow-sm">
            <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
            </div>
            <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.unit }}</span>
            <h5 class="card-title">
                <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!item.price">{{ item.origin_price }}</div>
                <del class="h6" v-if="item.price">{{ item.origin_price }}</del>
                <div class="h5" v-if="item.price">{{ item.price }}</div>
            </div>
            </div>
            <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
            @click.prevent="getProduct(item.id)">
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
            @click.prevent="addtoCart(item.id)">
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                加到購物車
            </button>
            </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="row mt-3 justify-content-center" v-if="cartInfo.carts != 0">
      <div class="col-md-6">
        <table class="table" >
          <thead>
            <tr>
              <th width="100"></th>
              <th>品名</th>
              <th width="80">數量</th>
              <th width="100">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cart in cartInfo.carts" :key="cart.id">
              <td>
                <button class="btn btn-outline-danger" @click.prevent="removeCartItem(cart.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ cart.product.title }}
                <br/>
                <span class="text-success" v-if="cart.coupon">已使用優惠券</span> 
              </td>
              <td class="align-middle">{{ cart.qty }}{{ cart.product.unit }}</td>
              <td class="text-right align-middle">{{ cart.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-right" colspan="3">總計</td>
              <td class="text-right">{{ cartInfo.total }}</td>
            </tr>
            <tr class="text-success" v-if="cartInfo.final_total != cartInfo.total">
              <td class="text-right" colspan="3">折扣價</td>
              <td class="text-right">{{ cartInfo.final_total }}</td>    
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="coupon" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-sm btn-outline-primary" @click="addCoupon">套用優惠碼</button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-validate="'required|email'"
            :class="{'is-invalid' : errors.has('email')}"
            v-model="form.user.email" placeholder="請輸入 Email">
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('name')}"
            v-model="form.user.name" placeholder="輸入姓名">
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel"
           v-model="form.user.tel" placeholder="請輸入電話">
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="address" class="form-control" name="address"
            v-validate="'required'"
            :class="{'is-invalid' : errors.has('address')}"
            id="useraddress" v-model="form.user.address"
            placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="10"
            v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    <!--prodModal-->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
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
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
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
    import $ from "jquery"; 

    export default {
        data(){
            return {
                products:[],
                product:{},
                cartInfo:{
                    carts:[],
                    total:"",
                    finalTotal:"",
                },
                form:{
                    user:{
                        name:"",
                        email:"",
                        tel:"",
                        address:""
                    }
                },
                isLoading:false,
                status:{
                  loadingItem:""
                },
                pagination:{},
                coupon:"",
            };
        },
        methods: {
            getProducts(page=1){
                const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
                const vm=this;
                vm.isLoading=true;
                vm.$http.get(api).then((response) => {     
                    vm.products=response.data.products;
                    vm.isLoading=false;
                    vm.pagination=response.data.pagination;
                })
            },

            getProduct(id){
                const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
                const vm=this;
                vm.status.loadingItem=id;
                vm.$http.get(api).then((response) => {      
                    vm.product=response.data.product;
                    $("#productModal").modal("show");
                    vm.getCarts();
                    vm.status.loadingItem="";
                })
            },

            addtoCart(id, qty=1){
              const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
              const vm=this;
              const cart={
                  "product_id":id,
                  qty,
              }
              vm.status.loadingItem=id;
              vm.$http.post(api, {data: cart }).then((response) => {   
                  vm.product=response.data.product;
                  $("#productModal").modal("hide");
                  vm.getCarts();
                  vm.status.loadingItem="";
              })
            },

            getCarts(){
                const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
                const vm=this;
                vm.isLoading=true;
                vm.$http.get(api).then((response) => {  
                    vm.cartInfo=response.data.data;
                    vm.isLoading=false;
                })
            },

            removeCartItem(id){
                const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
                const vm=this;
                vm.isLoading=true;
                vm.$http.delete(api).then((response) => {   
                    vm.getCarts();
                    vm.isLoading=false;
                })
            },

            addCoupon(){
                const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
                const vm=this;
                const coupon={
                    "code":vm.coupon
                }
                vm.isLoading=true;
                vm.$http.post(api, {data: coupon}).then((response) => {   
                    console.log('coupon: ',response)
                    vm.getCarts();
                    vm.isLoading=false;
                })
            },

            createOrder(){
                const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
                const vm=this;
                // vm.isLoading=true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        // do stuff if valid.
                        vm.$http.post(api, {data: vm.form, message:"okok"}).then((response) => { 
                            console.log(response)  
                            if(response.data.success){
                              vm.$router.push(`/custom_checkout/${response.data.orderId}`);
                            }
                            vm.isLoading=false;
                        })
                    }else{
                      console.log('表單不完整');
                    }
                }); 
            },

            priceCal(){
                const vm=this;
                const data=vm.cartInfo.carts;
                let total=0;
                // let finalPrice=0;
                for(let i=0; i<data.length;i++){
                    total+= data[i].total;
                }
                vm.cartInfo.total= total;
                // vm.cartInfo.finalTotal= finalPrice;
            }
        },
        created() {
            this.getProducts();
            this.getCarts();
        },

    }
</script>
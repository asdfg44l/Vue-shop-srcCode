<template>
    <div class=" row my-5 justify-content-center">
        <form class="col-md-6" @submit.prevent="createOrder">
            <h3 class="text-center py-3 text-white bg-info">使用者資料</h3>
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
                <label for="message">留言</label>
                <textarea  id="message" class="form-control" cols="20" rows="5"
                    v-model="form.message"></textarea>
            </div>
            <div class="text-right">
                <button type="submit" class="btn btn-danger">送出訂單</button>
            </div>
        </form> 
        <div class="col-md-4">
            <h3 class="text-center py-3 text-white bg-info">訂單明細</h3>
            <h5 class="text-danger font-sm">*以下金額單位為美金</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>商品名稱</th>
                        <th width="80">數量</th>
                        <th width="100">金額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cart in cartInfo.carts" :key="cart.id">
                        <td>{{ cart.product.title }}</td>
                        <td class="text-right">{{ cart.qty }} {{ cart.product.unit }}</td>
                        <td class="text-right">{{ cart.total | currencyFilter }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>應付金額:</td>
                        <td colspan="2" class="text-right">{{ cartInfo.final_total | currencyFilter }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>   
    </div>
</template>

<script>
    import { mapGetters } from "vuex" 
    export default {
        data(){
            return {
                form: {
                    user:{
                        name:"",
                        email:"",
                        tel:"",
                        address:""
                    }
                },
            };
        },
        methods: {
            createOrder(){
                const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
                const vm=this;
                // vm.isLoading=true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        // do stuff if valid.
                        vm.$http.post(api, {data: vm.form, message:"okok"}).then((response) => { 
                            if(response.data.success){
                                vm.$emit('ordersent')
                                vm.$router.push(`/checkout/${response.data.orderId}`);
                            }
                        })
                    }
                }); 
            },
        },
        computed: {
            ...mapGetters("cartModules", ["cartInfo"]),
        },
    }
</script>
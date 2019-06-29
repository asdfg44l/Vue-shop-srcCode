<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in Coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}%</td>
          <td>{{ coupon.due_date }}</td>
          <td>
            <span v-if="coupon.is_enabled === 1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-info btn-sm" @click="openModal(false,coupon)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openModal(false,coupon,'delcouponModal')">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!--addModal-->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
              v-model="tempCoupon.title"  placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code"
              v-model="tempCoupon.code"  placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
              v-model="tempCoupon.due_date" >
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
               v-model="tempCoupon.percent"  placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
            @click="updateCouponItem" >更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <!--delModal-->
    <div class="modal fade" id="delcouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
            @click="delCouponItem(tempCoupon.id)"  >確認刪除</button>
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
      Coupons:[],
      tempCoupon:{},
      isLoading:false,
      isNew:false,
      due_date:new Date(),
    };
  },
  watch:{
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    getCoupons(page=1){
      const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm=this;
      vm.isLoading=true;
      vm.$http.get(api).then((response) => {   
        vm.Coupons=response.data.coupons;
        vm.isLoading=false;
      })
    },
    updateCouponItem(){
      let api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      const vm=this;
      let method="post";
      if(!vm.isNew){
        api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        method="put";
      };

      vm.isLoading=true;
      vm.$http[method](api, {data: vm.tempCoupon}).then((response) => {   
          // console.log('coupon: ',response)
          vm.getCoupons();
          $("#couponModal").modal('hide');
          vm.isLoading=false;
      })
    },

    delCouponItem(id){
      const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`;
      const vm=this;
      vm.isLoading=true;
      vm.$http.delete(api).then((response) => {   
        console.log(response.data);
        vm.getCoupons();
        $("#delcouponModal").modal("hide");
        vm.isLoading=false;
      })
    },

    openModal(isNew,item={},target="couponModal"){
      const vm=this;
      $(`#${target}`).modal('show');
      vm.isNew=isNew;
      if(isNew){
        vm.tempCoupon={};
      }else{
        vm.tempCoupon=Object.assign({},item);
        const now=vm.due_date.toISOString().split("T");
        console.log(now === vm.tempCoupon.due_date);
      };
    },
  },

  created() {
    this.getCoupons();
  },
}
</script>
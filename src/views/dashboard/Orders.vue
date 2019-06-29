<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <table class="table">
        <thead>
            <tr>
                <th witdh="120">購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th class="text-center" witdh="100">應付金額</th>
                <th witdh="100">是否付款</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in orders" :key="order.id">
                <td>{{ order.create_at | time }}</td>
                <td>
                  <span v-if="order.user">{{ order.user.email }}</span>
                  <span v-else>未輸入</span>
                </td>
                <td>
                  <p v-for="item in order.products" :key="item.id">{{ item.product.title }}</p>
                </td>
                <td class="text-right">{{ order.total | currency }}</td>
                <td>
                  <span class="text-success" v-if="order.is_paid">已付款</span>
                  <span v-else>尚未付款</span>
                </td>
            </tr>
        </tbody>
    </table>
    <pagination @getOrder="getOrders" :page-info="pagination"></pagination>
  </div>
</template>

<script>
import pagination from "@/components/dashboard/pagination";

export default {
  data(){
    return {
      orders:[],
      pagination:{},
      isLoading:false,
    };
  },
  components:{
    pagination
  },
  methods: {
    getOrders(page= 1){
      const vm=this;
      const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      vm.isLoading=true;
      vm.$http.get(api).then((response) => {   
          vm.orders=response.data.orders;
          vm.pagination=response.data.pagination;
          vm.isLoading=false;
      })
    },
  },
  created(){
    this.getOrders();
  }
}
</script>
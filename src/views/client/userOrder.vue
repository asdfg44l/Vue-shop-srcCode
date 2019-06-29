<template>
  <div>
    aaaaa
  </div>
</template>

<script>
export default {
  data(){
    return {
      order:{
        user:{}
      },
      order_id:"",
    };
  },
  methods: {
    getOrder(){
        const vm=this;
        const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.order_id}`;

        vm.isLoading=true;
        vm.$http.get(api).then((response) => {   
            vm.order=response.data.order;
            vm.isLoading=false;
        })
    },

    payOrder(){
        const vm=this;
        const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.order_id}`;

        vm.isLoading=true;
        vm.$http.post(api).then((response) => {   
            console.log(response)
            if(response.data.success){
                vm.getOrder();
            }
            vm.isLoading=false;
        })
    }
  },
}
</script>


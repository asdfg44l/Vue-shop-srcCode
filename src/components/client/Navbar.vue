<template>
  <nav class="navbar navbar-expand-md navbar-dark px-md-4" >
    <router-link class="navbar-brand d-block ml-3 p-0" to="/index" >
        <img src="~@/assets/img/suzuki.svg" width="150" height="60">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse flex-row-reverse  mr-auto" id="navbarSupportedContent">
      <ul class="navbar-nav text-white d-flex flex-row justify-content-center">
          <li class="nav-item px-3 px-md-2">
                <div class="cartBtn">
                    <span class="badge badge-success rounded-circle position-absolute">{{ cartLength }}</span>
                    <router-link to="/cart" class="btn nav-link text-white" >
                      <i class="fas fa-shopping-cart"></i>
                    </router-link>
                </div>    
          </li>
      </ul>
      <ul class="navbar-nav font-lg mx-auto">
          <li class="nav-item">
            <router-link to="/index" class="nav-link underLine text-center p-3 mx-4">首頁</router-link>
          </li>
          <li class="nav-item ">
            <router-link to="/motocycle" class="nav-link underLine text-center p-3 mx-4">大型重機</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/accessories" class="nav-link underLine text-center p-3 mx-4">零件精品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link underLine text-center p-3 mx-4">後台連結</router-link>
          </li>
      </ul>
    </div>        
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return {
    };
  },
  methods: {
    ...mapActions("cartModules", ['getCarts']),
  },
  computed: {
    ...mapGetters("cartModules", ['cartLength']),
  },
  created() {
    this.getCarts();
  },
}
</script>

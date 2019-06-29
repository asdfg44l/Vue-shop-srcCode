import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';  //語言選擇
import zhTW from 'vee-validate/dist/locale/zh_TW';
import Loading from 'vue-loading-overlay';
// navbar footer
import Navbar from '@/components/client/Navbar.vue';
import Footer from '@/components/client/footer.vue'
// bootstrap
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import "./bus";
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false;
axios.defaults.withCredentials= true;

Vue.use(VueAxios, axios);
Vue.use(VueI18n);
//表單驗證，更改語言
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});
//filter
import currencyFilter from './filters/currency';
import timeFilter from './filters/time';

Vue.component('Navbar',Navbar);
Vue.component('Footer',Footer);
Vue.component('Loading', Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('time',timeFilter);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
  //確認該分頁是否需要驗證
  if(to.meta.requiresAuth){
    //使用 api 來確認使用者是否已經登入
    const api=`${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if(response.data.success){
        console.log("success login");
        next();
      }else{
        next({path:"/login"})
      }
    })
  }else{
    next();
  }
})

<template>
    <div>
      <loading :active.sync="isLoading"></loading>
      <div class="text-right p-3">
        <button type="button" class="btn btn-info" 
        @click.prevent="openModal(true)" >建立新的產品</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
         <tr v-for="(item,key) in products" :key="key">
           <td>{{ item.category }}</td>
           <td>{{ item.title }}</td>
           <td class="text-right">{{ item.origin_price | currency }}</td>
           <td class="text-right">{{ item.price | currency}}</td>
           <td>
            <span v-if="item.is_enabled">已啟用</span>
            <span v-else>未啟用</span>
           </td>
           <td>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-info" @click.prevent="openModal(false,item)">編輯</button>
              <button class="btn btn-sm btn-outline-danger" @click.prevent="openModal(false,item,'delProductModal')">刪除</button>
            </div>
           </td>
         </tr>
        </tbody>
      </table>
      <pagination @getProducts="getProducts" :page-info="pagination"></pagination>
      <!-- prodModal -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span class="text-white" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                      placeholder="請輸入圖片連結" v-model="tempProducts.imageUrl">
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                      <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                      ref="files" @change="uploadImg">
                  </div>
                  <img :src="tempProducts.imageUrl"
                    class="img-fluid" alt="">
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                      placeholder="請輸入標題" v-model="tempProducts.title">
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category"
                        placeholder="請輸入分類" v-model="tempProducts.category">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control" id="unit"
                        placeholder="請輸入單位" v-model="tempProducts.unit">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價" v-model="tempProducts.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price"
                        placeholder="請輸入售價" v-model="tempProducts.price">
                    </div>
                  </div>
                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                      placeholder="請輸入產品描述" v-model="tempProducts.description"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入產品說明內容" v-model="tempProducts.content"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox"
                        id="is_enabled"
                        v-model="tempProducts.is_enabled"
                        :true-value="1"
                        :false-value="0">
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click.prevent="updateProducts">確認</button>
            </div>
          </div>
        </div>
      </div>
      <!-- delModal -->
      <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              是否刪除 <strong class="text-danger">{{ tempProducts.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-danger"
              @click.prevent="updateProducts(del=true)"  >確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from "jquery";
import pagination from "@/components/dashboard/pagination";

export default {
  data(){
    return{
      products:[],
      tempProducts:{},
      isNew:false,
      isLoading:false,
      status:{
        fileUploading:false
      },
      pagination:{},
    };
  },
  components:{
    pagination,
  },
  methods: {
    getProducts(page=1){
      const api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      const vm=this;
      vm.isLoading=true;
      vm.$http.get(api).then((response) => {       
        vm.products=response.data.products;
        vm.isLoading=false;
        vm.pagination=response.data.pagination;
      })
    },
    updateProducts(del){
      del = del | false;
      let api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let apiMethod="post";
      const vm=this;
      if(del){
        api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProducts.id}`;
        apiMethod="delete";
      }else if(!vm.isNew){
        api=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProducts.id}`;
        apiMethod="put";
      };
      vm.$http[apiMethod](api,{data: vm.tempProducts}).then((response) => {
         if(response.data.success){
           $('#productModal').modal('hide');
           $('#delProductModal').modal('hide');
           vm.getProducts();
         } else{
           vm.getProducts();
           console.log('更新失敗');
         }
      })
    },
    openModal(isNew,item={},target='productModal'){
      $(`#${target}`).modal('show');
      $('#customFile').val("");
      if(isNew){
        this.tempProducts={};
        this.isNew=true;
      }else{
        this.tempProducts=Object.assign({},item);
        this.isNew=false;
      } 
    },
    uploadImg(){
      const image =this.$refs.files.files[0];
      const formData=new FormData();
      formData.append("file-to-upload", image);
      const url=`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      const vm=this;
      vm.status.fileUploading=true;
      vm.$http.post(url, formData,{
        headers:{
          'Content-Type':"multipart/form-data",
        }
      }).then((response) =>{
        vm.status.fileUploading=false;
        if(response.data.success){
          vm.$set(vm.tempProducts, "imageUrl", response.data.imageUrl)
        }else{
          vm.$bus.$emit('message:push',response.data.message, "danger");
        }
      });
    }
  },
  created() {
    this.getProducts();
  },
}
</script>
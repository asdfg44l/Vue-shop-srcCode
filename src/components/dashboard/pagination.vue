<template>
  <div>
     <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled' : !pageInfo.has_pre}">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pageInfo.current_page -1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" :class="{'active' : pageInfo.current_page === page}"  v-for="page in pageInfo.total_pages" :key="page">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled' : !pageInfo.has_next}">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pageInfo.current_page +1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
     </nav>
  </div>
</template>

<script>
export default {
    props:["page-info"],
    data(){
        return {};
    },
    methods: {
        changePage(pageNum){
          if(this.$route.name === 'product'){
            this.$emit("getProducts",pageNum);
          }
          if(this.$route.name === 'orderList'){
            this.$emit("getOrder",pageNum);
          }
        }
    },
}
</script>
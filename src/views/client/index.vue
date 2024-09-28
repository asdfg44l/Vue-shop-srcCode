<template>
  <div>
    <div class="banner">
      <div class="banner-cover"></div>
      <div class="banner-content position-relative">
          <Navbar></Navbar>
          <div class="container-fluid text-white my-auto" style="position: absolute; top:35%;">
              <div class="row">
                  <div class="slogan col-md-6 ml-auto">
                      <div class="slogan-content mx-auto">
                          <h2 class="slogan-title font-weight-bold">SUZUKI</h2>
                          <h3 class="slogan-subtitle font-weight-bold">SV650</h3>
                          <h3 class="slogan-subline">The Best Or Nothing</h3>
                      </div>
                  </div>
              </div>
          </div>
          <div class="container-fluid text-center mb-3" style="position: absolute; bottom:0;">
            <a @click.prevent="scrollIn" href="#story" class="btn scrollIn" >
              <i class="fas fa-arrow-circle-down fa-3x text-white"></i>
            </a>    
          </div>
      </div>
    </div>
  
    <h2 class="text-center my-5" ref="storyRef">品牌故事</h2>
    <div class="company-intro container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="container">
                    <img class="img-fluid mb-4 animate" src="~@/assets/img/suzuki-colorLogo.jpg">
                    <p class="text-center">
                        <strong>
                            Rev- 就像提高引擎轉速時，帶給人內心瞬間的躍動，
                            <br>
                            我們想把這樣的最佳體驗，傳遞給每個喜愛 SUZUKI 的人。
                        </strong>
                    </p>
                    <br>
                    <p class="text-center">
                        <strong>
                            SUZUKI 抱持創新的熱情，
                            <br>
                            就是為了創造超越顧客期待的感動，而不斷的挑戰。
                        </strong>
                    </p>
                </div>
            </div>
        </div>
      
    </div>

    <div class="charactor container-fluid mt-5 py-md-3">
      <div class="bg-full d-none d-md-block"></div>
      <div class="row">
        <div class="charPic animate col-md-5 ml-md-5"
        :style="{'backgroundImage': `url(${story1})`}" ></div>
      </div>
      <div class="charContent container-fluid py-3">
          <div class="row justify-content-end py-5">
            <div class="charText col-md-5 mr-md-5">
              <h3 class="textTitle font-weight-bold mb-3">
                FASTER SONS
              </h3>
              <p class="textContent">
                XSR700 根據 Faster Sons青出於藍的設計理念，以復古的精神打造出性能不斷蛻變的 Sport Heritage 車款。
                無論你想重現原裝完美復刻、或是濃厚的個人化經典風格，藉由 SUZUKI 在部品與選購精品的獨特設計，透過不同的選擇搭配，打造專屬於你的 XSR。 現代科技與復古靈魂的完美結合，僅獻給每一位追求性能表現，卻也懂得緬懷、深諳如何致敬經典的騎士。
              </p>
            </div>              
          </div>
      </div>
    </div>

    <div class="charactor container-fluid my-5 py-md-3">
        <div class="bg-full d-none d-md-block"></div>
        <div class="row">
          <div class="charPic leftPic animate col-md-5 mr-md-5"
          :style="{'backgroundImage': `url(${story2})`}"></div>
        </div>
        <div class="charContent container-fluid py-5">
            <div class="row justify-content-start py-5">
                <div class="charText col-md-5 ml-md-5">
                    <h3 class="textTitle font-weight-bold mb-3">
                        TRUE STORY
                    </h3>
                    <p class="textContent">
                        其實這根本不是 SUZUKI 的文案，都是從 YAMAHA 那裡偷偷 [搬運] 過來的，
                        因為 SUZUKI 的中文官網文案寫的實在比不上 YAMAHA ，虧他們的機車還蠻好看的說。
                    </p>
                </div>              
            </div>
        </div>
    </div>

    <Footer></Footer>
  </div>
</template>


<script>

import $ from 'jquery';

// background image
import story1 from '@/assets/img/tiny/story001.jpg'
import story2 from '@/assets/img/tiny/story002.jpg'

export default {
  data(){
    return{
      story1,
      story2
    };
  },

  methods: {
    scrollIn(){      
      const scrollDistance = this.$refs.storyRef.offsetTop - 48 // 3rem
      window.scrollTo({ top: scrollDistance, behavior: 'smooth' })
    }
  },
  mounted() {
    $(window).scroll(function(){
        //使用者移動多少距離
        var scrollPos= $(window).scrollTop();
        //畫面高度
        var windowHeight= $(window).height();

        $('.animate').each(function(){
            var thisPos= $(this).offset().top;
            if((windowHeight + scrollPos -80) >= thisPos){
              $(this).addClass('fadeIn');
            }
        })
    })   
  },
}
</script>

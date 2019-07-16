<template>
  <div>
    <div class="container my-5">
       <div class="h2 text-center text-white bg-info py-3 mb-3">常見問題</div>
       <div class="accordion" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                        <button class="btn btn-link text-dark font-lg" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          <i class="fas fa-question-circle fa-2x align-middle mr-3" style="color: red;"></i>
                          車輛要使用何種汽油?
                        </button>
                    </h2>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                        <i class="fas fa-comment-dots fa-2x align-middle  mx-3" style="color: blue"></i>
                        請參閱隨車附送之使用說明書相關內容。
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTwo">
                    <h2 class="mb-0">
                        <button class="btn btn-link text-dark font-lg collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                          <i class="fas fa-question-circle fa-2x align-middle mr-3" style="color: red;"></i>
                          車輛要使用何種機油?
                        </button>
                    </h2>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                    <div class="card-body d-flex">
                        <div><i class="fas fa-comment-dots fa-2x align-middle  mx-3" style="color: blue"></i></div>
                        <p>‧使用機油的查詢，可以參考官網中"正廠零件‧精品"的內容中，有對於使用者的騎乘習慣，建議使用各種油品，普遍來說，台灣較適宜使用的機油粘度番數，一般為20W-40(代表機油適用溫度：冬天-15度~高溫40度)或10W-40(平順型);以及20W-50(速度感型)三種，其他的並不太適合台灣之氣候溫度。
                        ‧詳細內容，請參閱隨車附送之使用說明書。</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree">
                    <h2 class="mb-0">
                        <button class="btn btn-link text-dark font-lg collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <i class="fas fa-question-circle fa-2x align-middle mr-3" style="color: red;"></i>
                            FI噴射車種如何保養?
                        </button>
                    </h2>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div class="card-body d-flex">
                        <div><i class="fas fa-comment-dots fa-2x align-middle  mx-3" style="color: blue"></i></div>
                        <p>國產車第1次保養在500公里或使用1個月後實施，而後每1000km或2000km定期保養一次，詳細的定期保養內容，請參考隨車附贈的保養手冊實施。</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingfour">
                    <h2 class="mb-0">
                        <button class="btn btn-link text-dark font-lg collapsed" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                            <i class="fas fa-question-circle fa-2x align-middle mr-3" style="color: red;"></i>
                            何謂FI? 它的優點是什麼？
                        </button>
                    </h2>
                </div>
                <div id="collapsefour" class="collapse" aria-labelledby="headingfour" data-parent="#accordionExample">
                    <div class="card-body d-flex">
                        <div><i class="fas fa-comment-dots fa-2x align-middle  mx-3" style="color: blue"></i></div>
                        <p>Fi就是"汽油噴射"的意思。機車採用FI系統是指，機車的燃料供應方式採用汽油噴射系統。它的最大優點就是：省油及低污染。SUZUKI 所採用的FI系統及部品零件，多為日本母廠設計及生產，品質穩定可靠。</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingfive">
                    <h2 class="mb-0">
                        <button class="btn btn-link text-dark font-lg collapsed" type="button" data-toggle="collapse" data-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                            <i class="fas fa-question-circle fa-2x align-middle mr-3" style="color: red;"></i>
                            引擎機油的功能為何？
                        </button>
                    </h2>
                </div>
                <div id="collapsefive" class="collapse" aria-labelledby="headingfive" data-parent="#accordionExample">
                    <div class="card-body d-flex">
                        <div><i class="fas fa-comment-dots fa-2x align-middle  mx-3" style="color: blue"></i></div>
                        <p>減磨作用、冷卻作用、密封作用、防鏽作用、清淨作用、酸中和作用。</p>
                    </div>
                </div>
            </div>
       </div>
    </div>
  </div>
</template>
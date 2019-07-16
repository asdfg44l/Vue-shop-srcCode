<template>
    <div class="footer">
        <ul class="nav justify-content-around py-3 bg-light">
            <li class="nav-item">
                <div class="card border-0 bg-transparent" style="width: 15rem;">
                    <router-link to="/option/maintenance" class="btn footerRoute">
                        <div style="height: 6rem;">
                            <i class="service fas fa-motorcycle fa-4x card-img-top p-3"></i>
                        </div>
                        <hr width="60">
                        <h5 class="card-title text-center pt-2 mt-2">原廠保養</h5>
                    </router-link>
                </div>
            </li>
            <li class="nav-item">
                <div class="card border-0 bg-transparent" style="width: 15rem;">
                    <router-link to="/option/safetyDrive" class="btn footerRoute">
                        <div style="height: 6rem;">
                            <i class="service fas fa-dharmachakra fa-4x card-img-top p-3"></i>
                        </div>
                        <hr width="60">
                        <h5 class="card-title text-center pt-2 mt-2">安全駕駛</h5>
                    </router-link>
                </div>
            </li>
            <li class="nav-item">
                <div class="card border-0 bg-transparent" style="width: 15rem;">
                    <router-link to="/option/question" class="btn footerRoute">
                        <div style="height: 6rem;">
                            <i class="service far fa-comment-dots fa-4x card-img-top p-3"></i>
                        </div>
                        <hr width="60">
                        <h5 class="card-title text-center pt-2 mt-2">FAQ</h5>
                    </router-link>
                </div>
            </li>
            <li class="nav-item">
                <div class="card border-0 bg-transparent" style="width: 15rem;">
                    <router-link to="/option/recallCar" class="btn footerRoute">
                        <div style="height: 6rem;">
                            <i class="service fas fa-tools fa-4x card-img-top p-3"></i>
                        </div>
                        <hr width="60">
                        <h5 class="card-title text-center pt-2 mt-2">召回車輛</h5>
                    </router-link>
                </div>
            </li>
        </ul>
        <div class="footerContent text-center mt-5">
            <p>為了你我的安全，請 " <strong class="text-danger">騎車不喝酒，喝酒不騎車</strong> "</p>
            <p>Copyright © 2019 YAMAHA MOTOR TAIWAN CO., LTD. All Rights Reserved.</p>
        </div>
   </div>
</template>

<style scope>
    hr{
        background:red;
    } 
    .card .btn.footerRoute{
        color: #000 !important;
    }
</style>
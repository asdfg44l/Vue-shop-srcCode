<template>
<div>
  <Navbar></Navbar>
  <form class="form-signin" @submit.prevent='userLogin'>
    <h1 class="h3 mb-3 font-weight-normal">登入帳號</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" 
    placeholder="Email address" v-model='user.username' required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" 
    placeholder="Password" v-model='user.password' required>
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
  </form>
</div>
 
</template>

<script>
export default {
  data () {
    return {
      user:{
        username:'',
        password:'',
        confirm_password: ''
      }
    }
  },
  methods: {
    userLogin(){
      const api=`${process.env.VUE_APP_APIPATH}/admin/signin`;
      this.user.confirm_password = this.user.password
      this.$http.post(api, this.user).then((response) => {
        if(response.data.success){
          this.$http.defaults.headers.Authorization = response.data.token
          localStorage.setItem("token", response.data.token)
          this.$router.push('/admin/product');
        }
      })
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

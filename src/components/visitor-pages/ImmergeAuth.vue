<template>
    <b-container id="logIn-signUp" class="content">
        <b-form class="logIn-form" @submit.prevent="handleLogin">
            <h2 id="immerge-title">Log in</h2>

            <b-form-group
                class="form-group"
                id="input-group-username"
                label-for="input-username">

                <b-form-input
                    class="form-input"
                    id="input-username"
                    v-model="login.user.username"
                    v-validate="'required'"
                    placeholder="Username"
                    name="username"
                    data-vv-scope="login">
                </b-form-input>
                <div
                    v-if="errors.has('login.username')"
                    class="alert alert-danger"
                    role="alert"
                >Username is required!</div>
            </b-form-group>

            <b-form-group
                class="form-group"
                id="input-group-password"
                label-for="input-password">

                <b-form-input
                    class="form-input"
                    id="input-password"
                    v-model="login.user.password"
                    v-validate="'required'"
                    type="password"
                    placeholder="Password"
                    name="password"
                    data-vv-scope="login">
                </b-form-input>
                <div
                    v-if="errors.has('login.password')"
                    class="alert alert-danger"
                    role="alert"
                >Password is required!</div>
            </b-form-group>

            <b-button type="submit" class="submit" id="LogIn-button" :disabled="login.loading">
                <span v-show="login.loading" class="spinner-border spinner-border-sm"></span>
                Log in</b-button>

            <!-- Forgot password -->
            <b-link class="forgot-pass" href="#">Forgot Password ?</b-link>

            <div class="form-group">
                <div v-if="login.message" class="alert alert-danger" role="alert">{{login.message.message}}</div>
            </div>
        </b-form>

        <!-- Side ad + Sign up -->
        <div class="sub-content">

            <div class="side-ad">
                <div class="side-text m-up">
                    <h2>New here?</h2>
                    <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <div class="side-text m-in">
                    <h2>One of us?</h2>
                    <p>If you already have an account, just sign in. We've missed you!</p>
                </div>
                <div class="side-btn">
                    <span class="m-up">Sign Up</span>
                    <span class="m-in">Sign In</span>
                </div>
            </div>

            <b-form class="signUp-form" @submit.prevent="handleRegister">
                <h2 id="immerge-title">Sign up</h2>

                <b-form-group
                    class="form-group"
                    id="input-group-email"
                    label-for="input-email">

                    <b-form-input
                        class="form-input"
                        id="input-email"
                        v-model="signup.user.email"
                        v-validate="'required|email|max:50'"
                        type="email"
                        placeholder="Email"
                        name="email"
                        data-vv-scope="register">
                    </b-form-input>
                    <div
                        v-if="signup.submitted && errors.has('register.email')"
                        class="alert-danger"
                    >{{errors.first('register.email')}}</div>
                </b-form-group>

                <b-form-group
                    class="form-group"
                    id="input-group-username"
                    label-for="input-username">

                    <b-form-input
                        class="form-input"
                        id="input-username"
                        v-model="signup.user.username"
                        v-validate="'required|min:3|max:20'"
                        placeholder="Username"
                        name="username"
                        data-vv-scope="register">
                    </b-form-input>
                    <div
                        v-if="signup.submitted && errors.has('register.username')"
                        class="alert-danger"
                    >{{errors.first('register.username')}}</div>
                </b-form-group>

                <b-form-group
                    class="form-group"
                    id="input-group-password"
                    label-for="input-password"
                    description="Password must be at least 8 characters.">

                    <b-form-input
                        class="form-input"
                        id="input-password"
                        v-model="signup.user.password"
                        v-validate="'required|min:6|max:40'"
                        type="password"
                        placeholder="Password"
                        name="password"
                        data-vv-scope="register">
                    </b-form-input>
                    <div
                        v-if="signup.submitted && errors.has('register.password')"
                        class="alert-danger"
                    >{{errors.first('register.password')}}</div>
                </b-form-group>
                

                <b-button type="submit" class="submit" id="SignUp-button">Sign up now</b-button>
                <div
                    v-if="signup.message"
                    class="alert"
                    :class="signup.successful ? 'alert-success' : 'alert-danger'"
                >{{signup.message.message}}</div>
            </b-form>
            
            

        </div>
    </b-container>
</template>

<script>
import User from '../../models/user';
export default {
  data() {
    return {
      login: {
        user: new User('', ''),
        loading: false,
        message: ''
      },
      signup: {
          user: new User('', '', ''),
          submitted: false,
          successful: false,
          message: ''
      }
    }
  },
  mounted() {
    document.querySelector('.side-btn').addEventListener('click', function()
    {
      document.querySelector('.content').classList.toggle('s-signup')
    });
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/eventor/profile');
    }
  },
  methods: {
    handleLogin() {
      this.login.message = '';
      this.login.loading = true;
      this.$validator.validate("login.*").then(isValid => {
        if (!isValid) {
          error => {
              this.login.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
            this.login.loading = false;
        }

        else {
          this.$store.dispatch('auth/login', this.login.user).then(
            () => {
              this.$store.dispatch('websockets/getAllNotificationsDB').then(
                () => {
                  this.$store.dispatch('websockets/connect').then(
                    () => {
                      this.$router.push('/eventor/profile');
                    }
                  )
                }
              )
            },
            error => {
              this.login.loading = false;
              this.login.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
    handleRegister() {
      this.signup.message = '';
      this.signup.submitted = true;
      this.$validator.validate("register.*").then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.signup.user).then(
            data => {
              this.signup.message = data.message;
              this.signup.successful = true;
            },
            error => {
              this.signup.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.signup.successful = false;
            }
          );
        }
      });
    },
  }
}
</script>

<style scoped>

body{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; 
  /* background: -webkit-linear-gradient(left, #7579ff, #b224ef); */
  font-family: 'Nunito', sans-serif;
}

 input, button {
  border:none;
  outline: none;
  background: none;
}

.content{
  overflow: hidden;
}

/* Custom */
@media only screen and (min-width: 551px) {
  .content{
  position: relative;
  overflow: hidden;
  margin-top: 4em; 
  /* Added from me: */
  padding: 0;
  width: 530px;
  height: 470px;
  background: #fff;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
}

form {
  position: relative;
  width: 360px;
  height: 100%; 
  /* first (50px) for top and bottom and second (30px) for left and right */
  padding: 5px 3px; 
  -webkit-transition:-webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

h2{
  width: 100%;
  font-size: 30px;
  text-align: center;
}

.form-group {
  display: block;
  margin: 25px auto 0;
  text-align: center;
}

.logIn-form .form-group {
  width: 280px;
}
.signUp-form .form-group {
  width: 310px;
}

.form-input{
  display: block;
  width: 100%;
  margin-top: 5px;
  font-size: 16px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(109, 93, 93, 0.4);
  text-align: center;
  font-family: 'Nunito', sans-serif; 
}

button{
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.submit{
  margin-top: 40px;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  /* background: -webkit-linear-gradient(left, rgb(243, 243, 19), rgb(33, 207, 33)); */
  background: -webkit-linear-gradient(left,rgb(182, 150, 245), rgb(55, 235, 55));
}

.submit:hover{
  /* background: -webkit-linear-gradient(left, #b224ef, #7579ff); */
  background: -webkit-linear-gradient(left, rgb(55, 235, 55), rgb(182, 150, 245));
}

.forgot-pass{
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0c0101;
  cursor: pointer;
}

.forgot-pass:hover{
  color: red;
}

 .sub-content{
  overflow: hidden;
  position: absolute;
  left: 360px;
  top: 0;
  width: 530px;
  height: 100%;
  /* sign up form starts from the 260th px on the left */
  padding-left: 170px;
  background: #fff;
  -webkit-transition: -webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
}


.content.s-signup .sub-content{
  -webkit-transform:translate3d(-360px, 0, 0);
          transform:translate3d(-360px, 0, 0);
}

.side-ad{
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 170px;
  height: 100%; 
  /* for button: */
  padding-top: 360px; 
}



.side-ad:before{
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 530px;
  height: 100%; 
  background-image: url(./../../assets/try.jpg);
  background-size: cover;
  /* background-size: 1200px 600px; */
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

.side-ad:after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
}

.content.s-signup .side-ad:before{
  -webkit-transform:translate3d(360px, 0, 0);
          transform:translate3d(360px, 0, 0);
}

.side-text{
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  -webkit-transition:-webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

.side-text h2{
  margin-bottom: 10px;
  font-weight: normal;
}

.side-text p{
  font-size: 14px;
  line-height: 1.5;
}

.content.s-signup .side-text.m-up{
  -webkit-transform:translateX(520px);
          transform:translateX(520px);
}

.side-text.m-in{
  -webkit-transform:translateX(-520px);
          transform:translateX(-520px);
}

.content.s-signup .side-text.m-in{
  -webkit-transform:translateX(0);
          transform:translateX(0);
}

.logIn-form{
  padding-top: 65px;
  -webkit-transition-timing-function:ease-out;
          transition-timing-function:ease-out;
}

.content.s-signup .logIn-form{
  -webkit-transition-timing-function:ease-in-out;
          transition-timing-function:ease-in-out;
  -webkit-transition-duration:1.2s;
          transition-duration:1.2s; 
  -webkit-transform:translate3d(360px, 0, 0);
          transform:translate3d(360px, 0, 0); 
}

.side-btn{
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}

.side-btn:after{
  content: '';
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.side-btn span{
  position: absolute;
  left: 0;
  top: 0;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack:center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-transition:-webkit-transform 1.2s;
  transition: -webkit-transform 1.2s;
  transition: transform 1.2s;
  transition: transform 1.2s, -webkit-transform 1.2s;;
}

/* side buttons  */
.side-btn span.m-in{
  -webkit-transform:translateY(-72px);
          transform:translateY(-72px);
}

.content.s-signup .side-btn span.m-in{
  -webkit-transform:translateY(0);
          transform:translateY(0);
}

.content.s-signup .side-btn span.m-up{
  -webkit-transform:translateY(72px);
          transform:translateY(72px);
}

.signUp-form{
  -webkit-transform:translate3d(-530px, 0, 0);
          transform:translate3d(-530px, 0, 0);
}

.content.s-signup .signUp-form{
  -webkit-transform:translate3d(0, 0, 0);
          transform:translate3d(0, 0, 0);
}
}

/* Default from website */
@media only screen and (min-width: 992px) {
.content{
  position: relative;
  overflow: hidden;
  margin-top: 4em; 
  /* Added from me: */
  padding: 0;
  width: 900px;
  height: 550px;
  background: #fff;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
}

form {
  position: relative;
  width: 640px;
  height: 100%; 
  /* first (50px) for top and bottom and second (30px) for left and right */
  padding: 50px 30px; 
  -webkit-transition:-webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

h2{
  width: 100%;
  font-size: 30px;
  text-align: center;
}

.form-group {
  display: block;
  margin: 25px auto 0;
  text-align: center;
}

.logIn-form .form-group {
  width: 300px;
}
.signUp-form .form-group {
  width: 400px;
}

.form-input{
  display: block;
  width: 100%;
  margin-top: 5px;
  font-size: 16px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(109, 93, 93, 0.4);
  text-align: center;
  font-family: 'Nunito', sans-serif; 
}

button{
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.submit{
  margin-top: 40px;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  /* background: -webkit-linear-gradient(left, rgb(243, 243, 19), rgb(33, 207, 33)); */
  background: -webkit-linear-gradient(left,rgb(182, 150, 245), rgb(55, 235, 55));
}

.submit:hover{
  /* background: -webkit-linear-gradient(left, #b224ef, #7579ff); */
  background: -webkit-linear-gradient(left, rgb(55, 235, 55), rgb(182, 150, 245));
}

.forgot-pass{
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0c0101;
  cursor: pointer;
}

.forgot-pass:hover{
  color: red;
}

 .sub-content{
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  /* sign up form starts from the 260th px on the left */
  padding-left: 260px;
  background: #fff;
  -webkit-transition: -webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
}


.content.s-signup .sub-content{
  -webkit-transform:translate3d(-640px, 0, 0);
          transform:translate3d(-640px, 0, 0);
}

.side-ad{
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%; 
  /* for button: */
  padding-top: 360px; 
}



.side-ad:before{
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%; 
  background-image: url(./../../assets/try.jpg);
  background-size: 1200px 600px;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

.side-ad:after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
}

.content.s-signup .side-ad:before{
  -webkit-transform:translate3d(640px, 0, 0);
          transform:translate3d(640px, 0, 0);
}

.side-text{
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  -webkit-transition:-webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

.side-text h2{
  margin-bottom: 10px;
  font-weight: normal;
}

.side-text p{
  font-size: 14px;
  line-height: 1.5;
}

.content.s-signup .side-text.m-up{
  -webkit-transform:translateX(520px);
          transform:translateX(520px);
}

.side-text.m-in{
  -webkit-transform:translateX(-520px);
          transform:translateX(-520px);
}

.content.s-signup .side-text.m-in{
  -webkit-transform:translateX(0);
          transform:translateX(0);
}

.logIn-form{
  padding-top: 65px;
  -webkit-transition-timing-function:ease-out;
          transition-timing-function:ease-out;
}

.content.s-signup .logIn-form{
  -webkit-transition-timing-function:ease-in-out;
          transition-timing-function:ease-in-out;
  -webkit-transition-duration:1.2s;
          transition-duration:1.2s; 
  -webkit-transform:translate3d(640px, 0, 0);
          transform:translate3d(640px, 0, 0); 
}

.side-btn{
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}

.side-btn:after{
  content: '';
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.side-btn span{
  position: absolute;
  left: 0;
  top: 0;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack:center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-transition:-webkit-transform 1.2s;
  transition: -webkit-transform 1.2s;
  transition: transform 1.2s;
  transition: transform 1.2s, -webkit-transform 1.2s;;
}

/* side buttons  */
.side-btn span.m-in{
  -webkit-transform:translateY(-72px);
          transform:translateY(-72px);
}

.content.s-signup .side-btn span.m-in{
  -webkit-transform:translateY(0);
          transform:translateY(0);
}

.content.s-signup .side-btn span.m-up{
  -webkit-transform:translateY(72px);
          transform:translateY(72px);
}

.signUp-form{
  -webkit-transform:translate3d(-900px, 0, 0);
          transform:translate3d(-900px, 0, 0);
}

.content.s-signup .signUp-form{
  -webkit-transform:translate3d(0, 0, 0);
          transform:translate3d(0, 0, 0);
}
}

/* For phones: */
@media only screen and (max-width: 550px) {
  .content{
    position: relative;
    overflow: hidden;
    margin-top: 4em;
    padding: 0;
    width:  300px;
    height: 440px;
    background: #fff;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.30), 0 3px 7px rgba(0, 0, 0, 0.22);
    padding-top: 100px;
  }

/* Log in and Sign up forms */
  form {
    position: relative;
    width: 100%;
    height: 340px;
    /* padding has to be null so that username, pass and remember me are centered */
    /* padding: 0; */
    -webkit-transition:-webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
    /* background-color: #0c0101; */
  }

  h2{
    width: 100%;
    font-size: 24px;
    text-align: center;
  }
   
  .form-group {
    display: block;
    margin: 17px auto 0;
    text-align: center;
  }

  #immerge-title {
    padding-bottom: 10px;
  }

  .logIn-form .form-group {
    width: 240px;
  }
  .signUp-form .form-group {
    width: 270px;
    margin:7px auto 0;
  }

  .form-input{
    display: block;
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
    padding-bottom: 3px;
    border-bottom: 1px solid rgba(109, 93, 93, 0.4);
    text-align: center;
    font-family: 'Nunito', sans-serif; 
  }

.signUp-form .form-input {
    margin-top: 10px;
  }

#input-group-consent {
  font-size: 15px;
  margin-top: 10px;
}

  button{
    display: block;
    margin: 0 auto;
    width: 180px;
    height: 34px;
    border-radius: 30px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
  }

  .submit{
    margin-top: 40px;
    margin-bottom: 30px;
    text-transform: uppercase;
    font-weight: 600;
    font-family: 'Nunito', sans-serif;
    background: -webkit-linear-gradient(left, rgb(182, 150, 245), rgb(55, 235, 55));
  }

  .signUp-form .submit {
    margin-top: 20px;
  }

  .forgot-pass{
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #0c0101;
    cursor: pointer;
  } 

 .forgot-pass:hover{
    color: red;
  }

  /* Specifications for the sign up container as a whole */
  .sub-content{
    overflow: hidden;
    position: absolute;
    left:0;
    bottom: 340px;
    width: 100%;
    height: 440px;
    padding-left: 0;
    /* padding-bottom: 100px; */
    background: #fff;
    -webkit-transition: -webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out;
    /* background-color: blueviolet; */
    /* padding-bottom: 100px; */
  }

  .content.s-signup .sub-content{
    -webkit-transform:translate3d(0, 340px, 0);
            transform:translate3d(0, 340px, 0);
  }

  .side-ad{
    overflow: hidden;
    z-index: 2;
    position: absolute; 
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    padding-top: 67px;
  }

    .side-ad:before{
    content: '';
    position: absolute;
    right: 0; 
    top: 0;
    bottom: 0;
    width: 100%;
    height: 440px; 
    background-image: url(./../../assets/join_cut.jpg);
    /* background-color: rgb(66, 211, 66); */
    background-size: 330px 555px;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
  }

   .side-ad:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
  }

  .content.s-signup .side-ad:before{
    -webkit-transform:translate3d(0, -340px, 0);
            transform:translate3d(0, -340px, 0);
  }

  .side-text{
    z-index: 2;
    position: absolute;
    left: 0;
    top: 5px;
    width: 100%;
    padding: 0;
    text-align: center;
    color: #fff;
    -webkit-transition:-webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
  }

  .side-text h2{
    margin-bottom: 3px;
    font-weight: normal;
    font-size: 18px;
  }

  .side-text p{
    font-size: 13px;
    line-height: 1.5;
  }

  .content.s-signup .side-text.m-up{
    -webkit-transform:translateY(440px);
            transform:translateY(440px);
  }

  .side-text.m-in{
    -webkit-transform:translateY(-440px);
            transform:translateY(-440px);
  }

  .content.s-signup .side-text.m-in{
    -webkit-transform:translateY(0);
            transform:translateY(0);
  }


  .logIn-form{
    padding-top: 15px;
    -webkit-transition-timing-function:ease-out;
            transition-timing-function:ease-out;
  }

  .content.s-signup .logIn-form{
    -webkit-transition-timing-function:ease-in-out;
            transition-timing-function:ease-in-out;
    -webkit-transition-duration:1.2s;
            transition-duration:1.2s; 
    -webkit-transform:translate3d(0, 340px, 0);
            transform:translate3d(0, 340px, 0); 
  }

  .side-btn{
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: 28px;
    margin: 0 auto;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;
    /* margin-top: 67px; */
  }

  .side-btn:after{
    content: '';
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    bottom:0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 30px;
  }

  .side-btn span{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack:center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    -webkit-transition:-webkit-transform 1.2s;
    transition: -webkit-transform 1.2s;
    transition: transform 1.2s;
    transition: transform 1.2s, -webkit-transform 1.2s;;
  }

  .side-btn span.m-in{
    -webkit-transform:translateY(-72px);
            transform:translateY(-72px);
  }

  .content.s-signup .side-btn span.m-in{
    -webkit-transform:translateY(0);
            transform:translateY(0);
  }

  .content.s-signup .side-btn span.m-up{
    -webkit-transform:translateY(72px);
            transform:translateY(72px);
  }

  .signUp-form{
    padding-top: 5px;
    -webkit-transform:translate3d(0, -100px, 0);
            transform:translate3d(0, -100px, 0);
  }

  .content.s-signup .signUp-form{
    -webkit-transform:translate3d(0, 0, 0);
            transform:translate3d(0, 0, 0);
  }
} 
</style>
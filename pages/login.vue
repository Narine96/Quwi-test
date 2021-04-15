<template>
    <form @submit.prevent="formSubmit">
      <h3>Login</h3>
       <p v-if="errors.length">
            <ul>
             <li v-for="error in errors" :key="error.id" class="error_message">{{ error }}</li>
            </ul>
        </p>
      <label>
        <input
          type="text"
          class="form-control"
          placeholder="Email"
          v-model="form.email"
        >
      </label>
      <label>
        <input
          type="password"
          class="form-control"
          placeholder="password"
          v-model="form.password"
        >
      </label>
      <div class="actions">
        <button
          type="submit"
          class="btn btn-dark"
        >
          LOGIN
        </button>
      </div>
    </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      mode: 'signIn',
      form: {
        email: '',
        password: '' 
      },
      errors: []
    }
  },
  methods: {
    changeUserState() {
      if (this.auth) {
        localStorage.removeItem('auth')
        this.$router.push({ name: 'main'})
      } else {
        localStorage.setItem('auth', true)
        this.auth = true
      }
    },
    formSubmit() {
        this.signIn()
    },
    signIn() {
        this.errors = []
         if (!this.form.email) {
            this.errors.push('* write email address');
        } else if (!this.validEmail(this.form.email)) {
            this.errors.push('* write correct email address');
        }
        if (!this.form.password) {
            this.errors.push('* write password');
        }
        if(this.errors.length === 0){
            this.$axios.post('https://api.quwi.com/v2/auth/login',{
                email: this.form.email,
                password: this.form.password
                })
                .then(response => {
                    console.log(response.data)
                    this.setUser(response.data.app_init.user)
                    this.setToken(response.data.token)
                    this.$cookies.set('token', response.data.token, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    })
                    this.$router.push({
                        name: 'home',
                    })
                })
                .catch(error =>{
                    this.errors.push('* Incorrect email or password')
                })    
        }
    },
    ...mapActions({
      setUser:'user/setUser',
      setToken:'user/setToken'
    }),
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>

<style>
form {
    background-color: #F4F4F4;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    height: 230px;
    width: 350px;
    padding: 20px 50px; 
    text-align: left;
    margin: 5% auto;
}
input {
    margin: 8px 0;
    height: 35px;
    width: 250px;
    border: 1px solid lightgray;
    border-radius: 4px;
}
button {
    background-color: #395378;
    color: white;
    height: 35px;
    width: 80px;
    border-radius: 8px;
    border: none;
    margin-top: 8px;
}
button:hover {
    cursor: pointer;
}
.error_message {
    color: red;
    list-style: none;
    font-size: 12px;
}
</style>

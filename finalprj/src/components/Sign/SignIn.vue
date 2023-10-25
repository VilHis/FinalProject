<template>
    <div>
      <div class="signUser">
        <h1>Вход</h1>
        <input placeholder="Почта" v-model="login">
        <input placeholder="Пароль" v-model="password"> 
        <button v-on:click="checkUser">Войти</button>
        <p class="yes" v-if="regflag">Вы вошли успешно</p>
        <p class="no" v-else>Неправильно введен пароль или логин</p> 
        <a href="/signup">Регистрация</a>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SignIn',
    data() {
      return { 
        workers: [],
        password: "",
        login: "",
        regflag: null,
        name: '',
        lastname: '',
        status:''
      }
    },
    mounted() {
      this.getUser();
      this.regflag = localStorage.getItem('regflag') === 'true';
    },
    methods: {
      getUser() {
        axios.get('http://localhost:9909/workers').then((res) => {
          console.log('ok');
          const users = res.data;
          this.workers = users;
        })
      },
      checkUser() {
        this.workers.forEach((el) => {
          if (el.password === this.password && el.email === this.login) {
            localStorage.setItem('regflag', true);
            localStorage.setItem('name', el.username);
            localStorage.setItem('status', el.status);
            localStorage.setItem('lastname', el.lastname);
            localStorage.email = el.email;
          } else {
            localStorage.setItem('regflag', false);
          }
        });
        location.reload();
      }
    }
  }
  </script>
<style>
        .signUser{
            width: 25%;
            margin-left: 15%;
            margin-top: 5%;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 10px;
          }
          .signUser *{
            width: 40%;
            height: 35px;
            margin: 1%;
            border: none;
            border-radius: 8px;
            color: black;
          }
          .signUser input{
            border-radius: 8px;
            z-index: 1;
          }
          .signUser input:hover{
            transition: all 0.2s;
            box-shadow: 0 7px 14px rgb(65 132 144 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
            }
            .signUser button:hover{
                transition: all 0.2s;
                box-shadow: 0 7px 14px rgb(65 132 144 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
            }
            .button:active {
                background-color: bisque;
              }
           .yes{
            color: chartreuse;
           }
           .no{
            color: brown;
           }
            a{
            margin: 30px;
            text-decoration: none;

           }

</style>
<template>
    <header id="header">
        <div id="logo">
            <h1>TaskMan</h1>
        </div>
        <div class="header_nav_menu">
            <a href="/">Главная</a>
            <a href="/table">Личный Кабинет</a>
            <a href="/signin">Регистрация/Вход</a>
            <a href="/AboutUs">О нас</a>
        </div>
    </header>
</template>
  
<script>

export default {
    name: 'HeaderBar'
}
</script> 

<style>
    header{
        width: 100%;
        height: 10%;
        display: flex;
        align-items: center;
        background-color:#a0a0a0
    }
    .header_nav_menu {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        list-style: none;
        font-size: 18px;
        margin: 0;
        padding: 0;
    }
    html,body {
        width: 100%;
        height: 100%;
        margin: 0;
    }
    #header a{
        margin: 30px;
        text-decoration: none;
        color: #18212b;

    }
    #header a:hover {
        text-shadow: 1px 1px rgb(206, 206, 206);
    }
    #logo{
        margin-left: 30px;
    }
</style>
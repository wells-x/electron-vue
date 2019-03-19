<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <main>
            <button @click="notice">ssss</button>
            <span @click="$router.push({name: 'login'})">登录</span>
        </main>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import {shell} from 'electron'

    export default {
        name: 'home',
        components: {},
        methods: {
            notice() {
                // shell.beep()
            }
        }
    }
</script>

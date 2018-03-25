
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data:{
        message:'',
        chat:{
            message:[],
            user:[],
            color:[],
            time:[],
            align:[]
        },
        typing:'',
        numberOfUsers:0
    },
    watch:{
        message(){
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message,
                    who: Laravel.user
                });
        }
    },
    methods:{
        send(){
            if (this.message.length != 0) {
                this.chat.message.push(this.message);
                this.chat.user.push(Laravel.user);
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());
                this.chat.align.push('right');
                axios.post('/send', {
                    message : this.message,
                    chat:this.chat
                })
                .then(response => {
                    console.log(response);
                    this.message = ''
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        getTime(){
            let time = new Date();
            return time.getHours()+':'+time.getMinutes();
        },
        getOldMessages(){
            axios.post('/getOldMessage')
            .then(response => {
                console.log(response);
                if (response.data != '') {
                    this.chat = response.data;
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        deleteSession(){
            axios.post('/deleteSession')
            .then(response=> {
                window.location.assign("/chat");
                this.$toaster.success('ลบข้อความเรียบร้อย');
        });
        }
    },
    mounted(){
        this.getOldMessages();
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.time.push(this.getTime());
                if (Laravel.user == e.user) {
                    this.chat.color.push('success');
                    this.chat.align.push('right');
                } else {
                    this.chat.color.push('warning');
                    this.chat.align.push('left');
                }
                axios.post('/saveToSession',{
                    chat : this.chat
                })
                .then(response => {
                })
                .catch(error => {
                    console.log(error);
                });
                // console.log(e);
            })
            .listenForWhisper('typing', (e) => {
                if (e.name != '') {
                    this.typing = e.who+' กำลังพิมพ์...'
                }else{
                    this.typing = ''
                }
            })

            Echo.join(`chat`)
                .here((users) => {
                    this.numberOfUsers = users.length;
                })
                .joining((user) => {
                    this.numberOfUsers += 1;
                    // console.log(user);
                    this.$toaster.success(user.name+' เข้าห้อง');
                })
                .leaving((user) => {
                    this.numberOfUsers -= 1;
                    this.$toaster.warning(user.name+' ออกจากห้อง');
                });
    }
});


<template>
    <div>
        <li class="list-group-item" :class="listClass + ' ' + alignClass"><slot></slot>
        <span id="time">{{ time }}</span></li>
        <small class="badge" :class='floatClass + " " + badgeClass'>{{ user }}</small>
    </div>
</template>

<script>
    export default {
        props:[
            'color',
            'user',
            'time',
            'align',
        ],
        computed:{
            listClass(){
                return 'list-group-item-'+this.color;
            },
            badgeClass(){
                return 'badge-'+this.color;
            },
            floatClass(){
                return 'float-'+this.align;
            },
            alignClass(){
                return 'text-'+this.align;
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
<style>
    #time{
        font-size: 9px;
        margin-top: 10px;
        color: black;
    }
</style>

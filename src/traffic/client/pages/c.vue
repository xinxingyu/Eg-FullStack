<template>
    <div><h2>我跳转了{{count}}次</h2>{{msg}}</div>
</template>
<script>
export default {
    name: 'c',
    computed: {
        count(){
            return this.$store.getters.getCount;
        }
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App , this is c view'
        }
    }
}
</script>

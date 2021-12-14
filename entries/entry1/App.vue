<!--
 * @Descripttion: 
 * @version: 
 * @Author: Charles Guo
 * @Date: 2021-12-13 23:13:28
 * @LastEditors: Charles Guo
 * @LastEditTime: 2021-12-14 13:39:39
-->
<template>
    <div>
        <HelloWorld />
        <AsyncComponent />
    </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {
        HelloWorld,
        AsyncComponent: () => import('@/components/AsyncComponent.vue')
    },
};
</script>

<style scoped lang="scss">

</style>

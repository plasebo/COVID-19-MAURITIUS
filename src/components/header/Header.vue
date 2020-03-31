<template>
    <header class="page-header">
        <h5 class="my-0 ml-5"><a href="/" class="text-light">COVID-19 Mauritius Tracker</a></h5>
    </header>
</template>

<script>
    import moment from "moment";

    export default {
        name: "Header",
        data() {
            return {
                year: 0,
            };
        },
        methods: {

        },
        mounted() {
            this.year = moment().format('YYYY');
        },
    }
</script>

<style scoped>
    .page-header {
        padding: 1rem;
        background:  url('~@/assets/virus_corona.png') 20px 50% no-repeat, url('~@/assets/footer.jpg') bottom right no-repeat;
        background-size: auto 75%, cover;
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
        position: sticky;
        margin: 0 -15px 2rem -15px;
        text-align: left;
    }
    .page-header a {
        text-decoration: none;
        transition: all 0.25s ease;
    }
    .page-header a:hover {
        text-decoration: none;
        color: rgba(255,255,255,0.8);
        margin-left: 6px;
    }
</style>
<template>
    <footer class="page-footer">
        <span>Copyright {{year}}. Powered by <a href="https://mns.mu/" target="_blank">Mauritius Network Services Ltd.</a><br />
        Developed and designed by Shane Permalloo.<br />
        COVID-19 live tracker delivered by <a href="https://github.com/mathdroid" target="_blank">mathdroid</a> 
        and <a href="https://github.com/novelcovid/api" target="_blank">NovelCovid</a><br />
        Made with <b-icon icon="heart-fill"></b-icon> in Moris </span>
    </footer>
</template>

<script>
    import moment from "moment";

    export default {
        name: "Footer",
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
    .page-footer {
        padding: 2rem;
        text-align: center;
        background:   url('~@/assets/moris.png') 20px 50% no-repeat, url('~@/assets/footer.jpg') center center no-repeat;
        background-size: auto 75%, cover;
        color: #fff;
        margin: 0 -15px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.4);

    }
</style>

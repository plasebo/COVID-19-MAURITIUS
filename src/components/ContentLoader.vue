<template>
    <div class="content-loader">
        <div style="text-align: right;" class="mb-2">
            <b-button @mouseover="animatedIcon = true" @mouseleave="animatedIcon = false" pill @click="refreshData()" variant="primary" :disabled="isLoading">
                <b-icon-arrow-clockwise :animation="isLoading || animatedIcon? 'spin': ''"></b-icon-arrow-clockwise> {{!isLoading? 'Refresh': 'Loading...'}}
            </b-button>
        </div>
        <template v-if="!isLoading">
            <slot name="content"></slot>
        </template>
        <div v-else>
            <b-spinner style="width: 3rem; height: 3rem;" class="m-5" label="Busy"></b-spinner>
            <div>Stay safe, stay home!<br />Ress to lakaz</div>
        </div>
    </div>
</template>

<script>
    import { BIconArrowClockwise } from 'bootstrap-vue'

    export default {
        name: "ContentLoader",
        components: { BIconArrowClockwise },
        props: { isLoading: { default: true } },
        data() {
            return {
                animatedIcon: false
            }
        },
        methods: {
            refreshData() {this.$emit('refresh-data')}
        }
    }
</script>
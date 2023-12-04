<template>
    <div class="flex-wrap" :class="{ 'is-center': center }" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Flex",
    props: {
        styles: {
            type: Object,
            required: false,
        },
        center: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {};
    },
    mounted() {
        console.log(this.styles);
    },
    methods: {},
};
</script>
<style lang="less" scoped>
.flex-wrap {
    display: flex;
}
.is-center {
    text-align: center;
    align-items: center;
    justify-content: center;
}
</style>

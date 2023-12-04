<template>
  <div>我是子组件</div>
</template>

<script>
export default {
  name: 'BedRoom',
  props: {
    testString: {
      type: String,
      required: false,
    },
    testObject: {
      type: Object,
      required: false,
    },
    onChange: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleChange(stringData, objectData) {
      this.onChange(stringData, objectData)
    },
    handleForceChange(stringData, objectData) {
      // this.testString = stringData
      // this.testObject.name = objectData.name
      console.log('data', stringData, objectData)
    },
    handleEmit() {
      this.$emit('handleChange', '我是子组件Emit传过来的字符串', {
        name: '我是子组件Emit传过来的对象',
      })
    },
    handleSendData() {
      return {
        testString: '我是子组件传过来的字符串',
        testObject: {
          name: '我是子组件传过来的对象',
        },
      }
    },
  },
}
</script>
<style lang="less" scoped></style>

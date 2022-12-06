<template>
  <button @click="handleClick">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0
    }
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count
    }
  },

  watch: {
    count() {
      this.localCount = this.count;
    }
  },

  methods: {
    handleClick() {
      this.localCount++;
      this.$emit('update:count', this.localCount);
    }
  }
};
</script>

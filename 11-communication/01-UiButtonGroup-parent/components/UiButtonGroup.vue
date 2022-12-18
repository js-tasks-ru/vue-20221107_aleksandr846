<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UiButtonGroup',

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    currentValue() {
      return this.modelValue;
    }
  },

  methods: {
    setValue(newValue) {
      this.$emit('update:modelValue', newValue);
    }
  }
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>

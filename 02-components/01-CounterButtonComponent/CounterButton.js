import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр и порождать событие
  props: {
    count: {
      default: 0
    }
  },
  emits: ['update:count'],
  methods: {
    changeCounter(value) {
      value++;
      this.$emit('update:count', value);
    },
  },
  template: `<button type="button" @click="changeCounter(count)">{{ count }}</button>`,
});

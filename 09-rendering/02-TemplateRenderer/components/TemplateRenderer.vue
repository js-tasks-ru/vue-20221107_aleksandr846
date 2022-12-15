<script>
// import { compile } from 'vue';

import { compile, h, defineComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    componentFromTemplate() {
      return defineComponent({
        components: this.components,
        props: ['bindings'],
        render: compile(this.template),
      });
    }
  },

  render() {
    return h( this.componentFromTemplate, { bindings : this.bindings } );
  }
};
</script>

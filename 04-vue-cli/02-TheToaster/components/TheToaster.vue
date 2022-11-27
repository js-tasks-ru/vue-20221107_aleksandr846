<template>
  <div class="toasts">
    <ui-toast
      v-for="toast in toasts"
      :key="toast.timeoutID"
      :type="toast.type"
      :message="toast.message"
      @click="hide(toast)"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

const TimeoutMs = 5000;

export default {
  name: 'TheToaster',

  components: { UiToast },

  TimeoutMs,

  data() {
    return {
      toasts: []
    }
  },
  methods: {
    success(message) {
      let property = {
        message,
        type: 'success',
        lifetime: TimeoutMs
      };
      this.show(property);
    },

    error(message) {
      let property = {
        message,
        type: 'error',
        lifetime: TimeoutMs
      };
      this.show(property);
    },
    show(p){
      p.timeoutID = setTimeout(() => this.hide(p), p.lifetime);
      this.toasts.push(p);
    },
    hide(p) {
      this.toasts = this.toasts.filter((toast) => toast.timeoutID !== p.timeoutID);
    }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast + .toast {
  margin-top: 20px;
}
</style>

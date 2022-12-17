<template>
  <slot v-if="state === $options.states.fulfilled" name="fulfilled" :result="result" />
  <slot v-else-if="state === $options.states.rejected" name="rejected" :error="error" />
  <slot v-else name="pending" />
</template>

<script>

const states = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export default {
  name: 'PromiseWrapper',

  states,

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      state: null,
      result: null,
      error: null
    }
  },

  methods: {
    setStateAndResult(s, r, e) {
      this.state = s;
      this.result = r;
      this.error = e;
    }
  },

  watch: {
    promise: {
      immediate: true,
      handler() {
        this.setStateAndResult(states.pending, null, null);
        this.promise
        .then((result) => {
          this.setStateAndResult(states.fulfilled, result, null);
        })
        .catch((error) => {
          this.setStateAndResult(states.rejected, null, error);
        });
      }
    }
  }
};
</script>

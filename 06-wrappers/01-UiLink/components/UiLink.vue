<template>
  <component :is="tag" class="link" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiLink',
  
  props: {
    tag: {
      type: [ String, Object ],
      default: 'RouterLink'
    }
  }
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>

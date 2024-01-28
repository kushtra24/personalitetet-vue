<script lang="ts" setup>
defineProps({
  as: {
    type: [String, Object],
    default: "Button"
  },
  link: {
    type: Boolean,
    default: false
  },
  linkTo: {
    type: String,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      const allowedVariants = ['primary', 'default', 'danger', 'success', 'white'];
      return allowedVariants.includes(value);
    },
  },
  icon: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: true
  }
})

</script>

<template>
  <component :is="as" class="btn no-left-margin" :class="'btn-' + variant" :disabled="disabled">

    <font-awesome-icon :icon="['fas', 'spinner']" spin  class="padding-left-right" v-if="loading"/>
    <font-awesome-icon :icon="icon" class="padding-left-right"/>
    <slot />
  </component>
</template>

<style>
.padding-left-right{
  padding: 0 5px;
}

</style>

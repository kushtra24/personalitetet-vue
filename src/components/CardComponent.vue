<script lang="ts" setup>

defineProps({
  title: {
    type: String,
    required: true
  },
  isSticky: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div class="card-container" :class="{'sticky-card': isSticky}">
    <h4>{{ title }}</h4>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.card-container {
  background: white;
  padding: 20px;
  margin-bottom: 15px;
}

.sticky-card {
  position: sticky;
  top: 20px;
}
</style>

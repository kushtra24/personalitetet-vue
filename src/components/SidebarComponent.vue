<script lang="ts" setup>

defineProps({
  title: String
})
</script>


<template>
  <div id="sidebar" class="col-md-4">
    <template v-if="title">
      <div>
        <h2>{{title}}</h2>
      </div>
    </template>
    <div>
      <slot name="header"></slot>
    </div>

      <slot></slot>
  </div>
</template>
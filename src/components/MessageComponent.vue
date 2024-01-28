<script lang="ts" setup>
import { ref, onMounted } from 'vue';


const props = defineProps({
  sevirity: {
    type: String,
    required: true,
    default: 'default',
    validator: (value: string) => {
      const allowedVariants = ['success', 'info', 'warn', 'error'];
      return allowedVariants.includes(value);
    },
  },
  icon: {
    type: Array
  },
  closable: {
    type: Boolean,
    default: false
  },
  fadeOut: {
    type: Number
  },
})

const isVisible = ref(true);

const hide = () => {
  isVisible.value = false;
}

onMounted(() => {
  if (props.fadeOut !== undefined) {
    setTimeout(() => {
      isVisible.value = false;
    }, props.fadeOut);
  }
});

</script>

<template>
  <div class="message" v-show="isVisible" :class="'message-' + sevirity" data-pc-section="text">
    <div class="message-wrapper">
      <font-awesome-icon :icon="icon" class="padding-left-right" />
      <div class="avatar" v-if="$slots.messageicon">
        <slot name="messageicon"></slot>
      </div>
      <slot></slot>
      <font-awesome-icon v-if="closable" class="message-close" :icon="['fas', 'circle-xmark']" @click="hide" />
    </div>
  </div>
</template>

<style lang="scss">
.hide {
  display: none;
}

.message-wrapper {
  display: flex;
  align-items: center;
}

.padding-left-right {
  padding: 0 5px;
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  margin: 0 0.5rem;

  &.avatar-image {
    background-color: transparent;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}


.message {
  margin: 1rem 0;
  border-radius: 6px;
  padding: 7px;
  font-weight: 500;

  &.message-error {
    background: rgba(254, 242, 242, 0.95);
    border: solid #FECACA;
    border-width: 1px;
    color: #DC2626;
  }

  &.message-error {
    box-shadow: 4px 6px 9px 0px rgba(239, 68, 68, 0.04);
  }

  &.message-success {
    background: rgba(240, 253, 244, 0.95);
    border: solid #BBF7D0;
    border-width: 1px;
    color: #16A34A;
  }

  &.message-info {
    background: rgba(239, 246, 255, 0.95);
    border: solid #BFDBFE;
    border-width: 1px;
    color: #2563EB;
  }

  &.message-warn {
    box-shadow: 0px 4px 8px 0px rgba(234, 179, 8, 0.04);
  }

  &.message-warn {
    background: rgba(254, 252, 232, 0.95);
    border: solid #FDE68A;
    border-width: 1px;
    color: #CA8A04;
  }
}

.message-close {
  margin-left: auto;
  overflow: hidden;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;

  &:hover {
    color: #DC2626;
    cursor: pointer;
  }
}</style>

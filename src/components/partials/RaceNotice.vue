<template>
  <div class="race-notice" data-testid="race-notice">
    <img src="@/assets/img/svg/horse-head.svg" alt="Horse Racing" width="60" />
    <h4 class="race-notice-text">{{ message }}</h4>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<style scoped lang="scss">
.race-notice {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--color-white);
  max-width: 300px;
  z-index: 2;
}

.race-notice-text {
  text-align: center;
  white-space: pre-wrap;
}
</style>

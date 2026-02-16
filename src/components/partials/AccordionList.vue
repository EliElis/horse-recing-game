<template>
  <div class="accordion-list">
    <div v-for="item in items" :key="item[itemKey]" class="accordion-item">
      <button
        class="accordion-header"
        :class="{ active: item[itemKey] === activeKey }"
        @click="toggle(item[itemKey])"
      >
        <slot name="header" :item="item">
          {{ item[itemKey] }}
        </slot>
        <span class="accordion-icon" :class="{ open: openKeys.has(item[itemKey]) }">&#9656;</span>
      </button>
      <Transition name="collapse">
        <div v-show="openKeys.has(item[itemKey])" class="accordion-body">
          <slot name="content" :item="item" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  items: Record<string, unknown>[]
  itemKey: string
  activeKey?: string | number | null
}>()

const openKeys = ref<Set<unknown>>(new Set())

function toggle(key: unknown) {
  if (openKeys.value.has(key)) {
    openKeys.value.delete(key)
  } else {
    openKeys.value.add(key)
  }
}

watch(
  () => props.activeKey,
  (key) => {
    if (key != null) {
      openKeys.value.clear()
      openKeys.value.add(key)
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.accordion-item {
  margin-bottom: 4px;
}
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: initial;
  width: 100%;
  padding: 8px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  background-color: #f1f5f9;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cbd5e1;
  }

  &.active {
        background-color: #e2e8f0;
    &:hover {
      background-color: #cbd5e1;
    }
  }
}

.accordion-icon {
  display: inline-block;
  transition: transform 0.25s ease;
  font-size: 12px;

  &.open {
    transform: rotate(90deg);
  }
}

.accordion-body {
  overflow: hidden;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.25s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>

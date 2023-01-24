<script setup>
import CloseButtonIcon from './icons/IconCloseButton.vue'
</script>

<template>
  <button class="close-button">
    <span class="close-icon">
      <CloseButtonIcon />
    </span>
  </button>
</template>

<style scoped>
.close-button {
  background-color: inherit;
  border: none;
}

.close-button:hover {
  cursor: pointer;
}

.close-button:hover svg {
  stroke: var(--color-purple);
}

.close-icon {
  display: flex;
  place-items: center;
  place-content: center;
  width: 39px;
  height: 39px;
}
</style>
<template>
  <button @click="$emit('click')" :class="{ 'button--disabled': disabled }" class="button">
    <slot>Регистрация</slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  width: 234px;
  height: 39px;
  border: 1px solid var(--color-purple);
  border-radius: 9px;
  background-color: inherit;
  color: var(--color-purple);
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  margin: auto;
  cursor: pointer;
}

.button:hover {
  color: #fff;
  background-color: var(--color-purple);
}

.button--disabled {
  opacity: .5;
  cursor: not-allowed;
}

.button--disabled:hover {
  color: var(--color-purple);
  background-color: inherit;
}
</style>
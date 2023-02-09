<template>
  <div>
    <select  :class="{ 'default-option': !value }" class="control" :value="value" @input="$emit('input', $event.target.value)">
      <option v-for="option in options" :value="option.value" class="option">
        {{ option.text }}
      </option>
    </select>
    <small v-if="error" class="control-error-text">{{ error }}</small>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    error: {
      type: String,
    },
    options: {
      type: Array
    }
  },
}
</script>

<style scoped>
.control {
  width: 100%;
  border: 1px solid #e6e6eb;
  border-radius: 11px;
  padding: 10px;
  font-family: Montserrat;
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
}

.control:focus {
  outline: 0;
  border: 1px solid var(--color-purple);
}

.control-error-text {
  padding-left: 5px;
  color: #ff0000;
}

.default-option {
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  color: #9292A0;
}

.option:first-child {
  display: none;
}

.option:not(:first-child) {
  color: #000;
}
</style>
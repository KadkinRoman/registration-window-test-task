<template>
  <div>
    <input 
      class="control" 
      :type="type" 
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value);"
    />
    <small 
      v-if="error"
      class="control-error-text">
      {{ error }}
    </small> 
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: String,
    },
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
</style>
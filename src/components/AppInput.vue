<template>
  <div>
    <input 
      class="control" 
      :value="userData" 
      @input="$emit('input', $event.target.value)" 
      :type="type" 
      :placeholder="placeholder"
      :class="{ 'control--error': userError }"
    />
    <small 
      v-if="userError"
      class="control-error-text">
      {{ userError }}
    </small> 
  </div>
</template>

<script>
export default {
  model: {
    prop: 'userData',
    event: 'input'
  },
  props: {
    userData: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: 'text'
    },
    userError: {
      type: String,
    },
  }
}
</script>

<style scoped>
.control {
  width: 100%;
  border: 1px solid #e6e6eb;
  border-radius: 11px;
  padding: 10px;
}

.control::placeholder {
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  color: #9292a0;
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
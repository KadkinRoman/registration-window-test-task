<template>
  <div>
    <select  :class="{ 'default-option': !userData }" :value="userData" v-model="selected" class="control" @input="$emit('change', $event.target.value)">
      <option value="" disabled selected>Должность:</option>
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <small v-if="userError" class="control-error-text">{{ userError }}</small>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'userData',
    event: 'change'
  },
  props: {
    userData: {
      type: String,
    },
    userError: {
      type: String,
    },
  },
  data() {
    return {
      selected: '',
      options: [
        { text: 'Руководитель', value: 'supervisor' },
        { text: 'Студент', value: 'student' }
      ]
    }
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

.default-option {
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  color: #9292A0;
}
</style>
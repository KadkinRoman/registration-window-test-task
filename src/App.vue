<script setup>
import AppButton from './components/AppButton.vue';
import RegistrationForm from './RegistrationForm.vue'
</script>

<template>
  <div id="app">
    <template v-if="!formOpen && !success">
      <AppButton @click="openForm" />
    </template>
    <template v-else-if="formOpen && !success">
      <RegistrationForm @response="(result) => {success = result}" @close="closeForm"/>
    </template>
    <template v-else>
      <div class="container">
        <h1 style="text-align: center;">Регистрация прошла успешно</h1>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formOpen: false,
      success: false,
    }
  },
  methods: {
    openForm() {
      this.formOpen = true;
    },
    closeForm() {
      this.formOpen = false;
    },
  },
}
</script>
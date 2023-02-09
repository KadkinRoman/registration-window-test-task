<script setup>
import SectionItem from './layouts/SectionItem.vue';
import InputItem from './layouts/InputItem.vue';
import CloseButton from './components/CloseButton.vue';
import AppButton from './components/AppButton.vue';
import AppCheckbox from './components/AppCheckbox.vue'
import AppInput from './components/AppInput.vue';
import AppSelect from './components/AppSelect.vue'
import PhotoUpload from './components/PhotoUpload.vue'
</script>

<template>
  <div id="registration-form">
    <header class="header">
      <div class="header__container container">
        <h1 class="header__title">Регистрация</h1>
        <CloseButton @click.native="closeForm" />
      </div>
    </header>
    <hr>
    <main>
      <SectionItem>
        <template #heading>
          <AppCheckbox v-model="user.public" class="toggle-checkbox" :id="checkboxToggleId" />
          Публичный профиль
        </template>
        <p class="public-profile__text">Включает промо-страницу для просмотра пользователями по ссылке или из
          каталога</p>
      </SectionItem>
      <div class="container">
        <hr />
      </div>
      <SectionItem>
        <template #heading>
          Данные
        </template>

        <InputItem>
          <template #name>
            <AppInput v-model="user.name" @input.native="errors.username = ''" placeholder="Имя"
              :error="errors.username" />
          </template>
          <template #role>
            <AppSelect v-model="user.role" :options="options" :error="errors.role" @change.native="errors.role = ''" />
          </template>
          <template #email>
            <AppInput v-model="user.email" @input.native="errors.email = ''" placeholder="Почта"
              :error="errors.email" />
          </template>
          <template #password>
            <AppInput v-model="user.password" @input.native="errors.password = ''" type="password" placeholder="Пароль"
              :error="errors.password" />
          </template>
          <template #password-repeat>
            <AppInput v-model="user.password_repeat" @input.native="errors.password_repeat = ''" type="password"
              placeholder="Пароль" :error="errors.password_repeat" />
          </template>
        </InputItem>
      </SectionItem>
      <div class="container">
        <hr />
      </div>
      <SectionItem>
        <template #heading>
          Фото профиля
        </template>
        <PhotoUpload @change="onFileChange" class="profile__photo" />
      </SectionItem>
      <SectionItem>
        <AppCheckbox v-model="isAgreement" class="checkbox" >
          <p>Нажимая на кнопку “Регистрация”, я подтверждаю свое соглашение с политикой
          конфиденциальности и обработки персональных данных</p>
        </AppCheckbox>
      </SectionItem>
      <AppButton @click="submit" :disabled="!isAgreement" />
    </main>
  </div>
</template>

<script>
import { registerRequest } from './api/auth.js';
export default {
  data() {
    return {
      formOpen: false,
      success: false,
      isAgreement: true,
      user: {
        name: "",
        role: "",
        email: "",
        password: "",
        password_repeat: "",
        photo: "",
        public: true,
      },
      errors: {},
      options: [
        { text: 'Должность', value: '' },
        { text: 'Руководитель', value: 'supervisor' },
        { text: 'Студент', value: 'student' }
      ],
      checkboxToggleId: 'toggle'
    }
  },
  methods: {
    closeForm() {
      this.$emit('close');
    },
    async submit() {

      if (!this.isAgreement) {
        return;
      }

      const registerData = await registerRequest(this.user);

      this.success = registerData.success;

      if (this.success === true) {
        this.$emit('response', this.success);
        return;
      }

      this.errors = Object.assign(
        {}, Object.fromEntries(
          Object.entries(registerData.errors).map(([key, value]) => [key, value[0]])
        )
      );

      this.handleErrors();
    },
    handleErrors() {
      // добавляю ошибку при пустом поле user.name потому что с сервера не приходит такая ошибка, а success = false
      if (this.user.name.length === 0) {
        this.errors.username = "Необходимо заполнить поле «Name».";
      }
    },
    onFileChange(photo) {
      this.user.photo = photo;
    },
  },
}
</script>

<style scoped>
#registration-form {
  background: var(--color-background);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 27px 0 47px;
}

hr {
  border: 1px solid #D9D9D9;
}

.header {
  padding: 0 0 2.7rem 0;
  box-shadow: inset 0px -1px 0px #edeff3;

}

.header__container {
  display: flex;
}

.header__title {
  color: var(--color-header-text);
  flex: 1;
  font-weight: 700;
  font-size: 19px;
  line-height: 142%;
  letter-spacing: -0.0035em;
  align-self: center;
}
</style>

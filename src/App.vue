<script setup>
import CloseButton from './components/CloseButton.vue';
import SwitcherButton from './components/SwitcherButton.vue'
import LoadingIcon from './components/icons/IconLoading.vue'
</script>

<template>
  <div id="app">
    <template v-if="!formOpen && !success">

      <button @click="openForm">Регистрация</button>


    </template>
    <template v-else-if="formOpen && !success">
      <header class="header">
        <div class="header__container container">
          <h1 class="header__title">Регистрация</h1>
          <CloseButton @click.native="closeForm" />
        </div>
      </header>
      <hr>
      <main>
        <section class="public-profile">
          <div class="container public-profile__container">
            <div class="public-profile__row">
              <SwitcherButton @change="changePublicStatus" />
              <h2 class="public-profile__title">Публичный профиль</h2>
            </div>
            <div class="public-profile__row">
              <p class="public-profile__text">Включает промо-страницу для просмотра пользователями по ссылке или из
                каталога</p>
            </div>
          </div>
        </section>
        <div class="container">
          <hr />
        </div>
        <section class="user-data">
          <div class="container user-data__container">
            <h2 class="user-data__title">Данные</h2>
            <div class="user-data__form-group">
              <div class="control-name">
                <input @input="errors.username = ''" :class="{ 'control--error': errors.username }" v-model="user.name" class="control" type="text"
                  name="user-name" id="username" placeholder="Имя">
                <small v-if="errors.username?.length" class="control-error-text">{{ errors.username[0] }}</small>
              </div>
              <div class="control-role">
                <select :class="{ 'default-option': !user.role }" v-model="user.role" class="control" name="user-role"
                  id="user-role">
                  <option value="" disabled selected hidden>Должность</option>
                  <option value="supervisor">Руководитель</option>
                  <option value="worker">Рабочий</option>
                </select>
                <small v-if="errors.role?.length" class="control-error-text">{{ errors.role[0] }}</small>
              </div>
              <div class="control-email">
                <input @input="errors.email = ''"  :class="{ 'control--error': errors.email }" v-model="user.email" class="control" type="email"
                  name="user-email" id="user-email" placeholder="Почта">
                  <small v-if="errors.email?.length" class="control-error-text">{{ errors.email[0] }}</small>
              </div>
              <div class="control-password">
                <input @input="errors.password = ''" :class="{ 'control--error': errors.password }" v-model="user.password" class="control "
                  type="password" name="user-password" id="user-password" placeholder="Пароль">
                  <small v-if="errors.password?.length" class="control-error-text">{{ errors.password[0] }}</small>
              </div>
              <div class="control-password-repeat">
                <input @input="errors.password_repeat = ''"  :class="{ 'control--error': errors.password_repeat }" v-model="user.password_repeat"
                  class="control " type="password" name="user-password-repeat" id="user-password-repeat"
                  placeholder="Повторите пароль">
                  <small v-if="errors.password_repeat?.length" class="control-error-text">{{ errors.password_repeat[0] }}</small>
              </div>
            </div>
          </div>
        </section>
        <div class="container">
          <hr />
        </div>

        <section class="profile">
          <div class="container profile__container">
            <h2 class="profile__title">Фото профиля</h2>
            <div class="profile__photo photo">
              <label class="profile__label" for="image_uploads">
                <img v-if="user.photo" class="photo__img" :src="user.photo" />
                <span v-else class="loading-icon">
                  <LoadingIcon />
                </span>
              </label>
              <input class="profile__input" @change="onFileChange" ref="myFiles" type="file" id="image_uploads"
                name="image_uploads" accept=".jpg, .jpeg, .png">
            </div>

            <div class="form-group profile__form-group">
              <input @change="changeAgreementStatus" class="custom-checkbox" type="checkbox" id="chkbx" value="1"
                checked>
              <label for="chkbx">
                <span></span> Нажимая на кнопку “Регистрация”, я подтверждаю свое соглашение с политикой
                конфиденциальности и обработки персональных данных
              </label>
            </div>
            <button @click="submit" :class="{ 'registration-button--disabled': !isAgreement }"
              class="registration-button">Регистрация</button>
          </div>
        </section>
      </main>
    </template>
    <template v-else>
      <div class="container">
        <h1 style="text-align: center;">Решистрация прошла успешно</h1>
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
      public: 1,
      isAgreement: true,
      user: {
        name: "",
        role: "",
        email: "",
        password: "",
        password_repeat: "",
        photo: ""
      },
      errors: {}
    }
  },
  methods: {
    openForm() {
      this.formOpen = true;
    },
    closeForm() {
      this.formOpen = false;
    },
    async submit(e) {
      e.preventDefault();

      if (!this.isAgreement) {
        return;
      }

      const formData = new FormData();
      formData.append('public ', this.public);
      formData.append('username', this.user.name);
      formData.append('role', this.user.role);
      formData.append('email', this.user.email);
      formData.append('password', this.user.password);
      formData.append('password_repeat', this.user.password_repeat);
      formData.append('photo', this.user.photo);

      const response = await fetch('https://lmstestapi.reezonly.com/v1/user/signup', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      this.success = result.success;

      this.errors = Object.assign({}, result.errors);
      this.handleErrors();
    },
    handleErrors() {
      // добавляю ошибку при пустом поле user.name потому что с сервера не приходит такая ошибка, а success = false
      if (this.user.name.length === 0) {
        this.errors.username = ["Необходимо заполнить поле «Name»."];
      }
    },
    changePublicStatus() {
      this.public = +!this.public;
    },
    changeAgreementStatus() {
      this.isAgreement = !this.isAgreement;
    },
    onFileChange(e) {
      const files = e.target.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.user.photo = reader.result);
    },
  },
}

</script>

<style scoped>
hr {
  border: 1px solid #D9D9D9;
}

#app {
  background: var(--color-background);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 2.7rem 0;
  box-shadow: inset 0px -1px 0px #EDEFF3;

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


/* public-profile */
.public-profile {
  padding: 27px 0;
}

.public-profile__container {}

.public-profile__row {
  display: flex;
  align-items: center;
}

.public-profile__row:not(:last-child) {
  margin: 0 0 15px 0;
}

.public-profile__title {
  font-weight: 500;
  font-size: 16px;
  line-height: 119%;
}

.public-profile__text {
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  color: #696977;
}


/* user-data */
.user-data {
  padding: 20px 0;
}

.user-data__form-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-rows: repeat(3, 65px); */
  grid-template-areas:
    "name role"
    "email ."
    "password password-repeat";
  gap: 20px 18px;
  column-gap: 18px;
}

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
  color: #9292A0;
}

.control--error {
  border: 1px solid red;
}

.control-name {
  grid-area: name;
}

.control-role {
  grid-area: role;
}

.control-email {
  grid-area: email;
}

.control-password {
  grid-area: password;
}

.control-password-repeat {
  grid-area: password-repeat;
}

.control:focus {
  outline: 0;
  border: 1px solid var(--color-purple);
}

.control-error-text{
  color: red;
}

.default-option {
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  color: #9292A0;
}


@media (max-width: 575.98px) {
  .user-data__form-group {
    grid-template-columns: 1fr;
    grid-template-areas:
      "name"
      "role"
      "email"
      "password"
      "password-repeat"
  }
}

/* profile */
.profile {
  padding: 20px 0 47px;
}

.profile__title {
  font-weight: 500;
  font-size: 16px;
  line-height: 119%;
  color: #000000;
  margin: 0 0 25px 0;
}

.profile__photo {
  margin: 0 0 65px 0;
}

.photo {
  width: 103px;
  height: 152.92px;
  background: #C4C4C4;
  border-radius: 5px;
  display: flex;
  place-items: center;
  place-content: center;
  cursor: pointer;
}

.photo:hover {
  background: #c4c4c4a6;
}

.photo__img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.loading-icon {
  display: flex;
  place-items: center;
  place-content: center;
  width: 39px;
  height: 40px;
}

.profile__label {
  display: flex;
  place-items: center;
  place-content: center;
  width: 100%;
  height: 100%;
}

.profile__input {
  display: none;
}

/* custom checkbox */
.profile__form-group {
  margin: 0 0 40px 0;
}

.custom-checkbox {
  display: none;
}

.custom-checkbox+label {
  font-weight: normal;
  cursor: pointer;
}

.profile__form-group label {
  display: grid;
  grid-template-columns: 26px 1fr;
  max-width: 80%;
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  color: #000;
  gap: 5px;
}

.custom-checkbox+label span {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  cursor: pointer;
  position: relative;
  background: #fff;
  border: 1px solid var(--color-purple);
  border-radius: 5px;
  transform: matrix(1, 0, 0, -1, 0, 0);
}

.custom-checkbox:checked+label span {
  background: var(--color-purple);
}

.custom-checkbox:checked+label span::before {
  content: '';
  position: absolute;
  right: 50%;
  top: 40%;
  width: 10px;
  height: 4px;
  border: solid #fff;
  border-width: 0px 2px 2px 0px;
  margin: -1px -1px 0 -1px;
  transform: rotate(225deg) translate(-50%, 50%);
  z-index: 2;
}

/* button registration*/
.registration-button {
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

.registration-button:hover {
  color: #fff;
  background-color: var(--color-purple);
}

.registration-button--disabled {
  opacity: .5;
  cursor: not-allowed;
}

.registration-button--disabled:hover {
  color: var(--color-purple);
  background-color: inherit;
}
</style>

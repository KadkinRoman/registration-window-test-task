<template>
  <div class="user-data__form-group">
    <div class="control-name">
      <slot name="name"></slot>
    </div>
    <div class="control-role">
      <slot name="role"></slot>
    </div>
    <div class="control-email">
      <slot name="email"></slot>
    </div>
    <div class="control-password">
      <slot name="password"></slot>
    </div>
    <div class="control-password-repeat">
      <slot name="password-repeat"></slot>
    </div>
  </div>
</template>

<style scoped>
/* user-data */

.user-data__form-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "name role"
    "email ."
    "password password-repeat";
  gap: 20px 18px;
  column-gap: 18px;
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
</style>
<template>
  <div class="form-group">
    <input @change="$emit('change')" type="checkbox" id="toggle_1" class="chkbx-toggle" value="1" checked>
    <label for="toggle_1"></label>
  </div>
</template>

<style scoped>
.form-group{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px 0 0;
}
.chkbx-toggle {
  display: none;
}

label {
    display: inline-block;
    max-width: 100%;
    /* margin-bottom: 5px; */
    font-weight: 700;
}

.chkbx-toggle + label {
    position: relative;
    cursor: pointer;
    outline: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    width: 40px;
    height: 20px;
    background-color: #e4e4e4;
    -moz-border-radius: 60px;
    -webkit-border-radius: 60px;
    border-radius: 60px;
    -moz-transition: background 0.4s;
    -o-transition: background 0.4s;
    -webkit-transition: background 0.4s;
    transition: background 0.4s;
}

.chkbx-toggle+label::before,
.chkbx-toggle+label::after {
  content: "";
  display: block;
  position: absolute;
}

.chkbx-toggle + label::before {
    right: 1px;
    left: 1px;
    top: 1px;
    bottom: 1px;
    background-color: #F1F1F1;
    -moz-border-radius: 60px;
    -webkit-border-radius: 60px;
    border-radius: 60px;
    -moz-transition: background 0.4s;
    -o-transition: background 0.4s;
    -webkit-transition: background 0.4s;
    transition: background 0.4s;
}
.chkbx-toggle + label::after {
    top: -1px;
    left: 0;
    width: 22px;
    height: 22px;
    background-color: #fff;
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    border-radius: 100%;
    -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 1px 5px rgb(0 0 0 / 30%);
    box-shadow: 0 1px 5px rgb(0 0 0 / 30%);
    -moz-transition: -moz-transform 0.4s;
    -o-transition: -o-transform 0.4s;
    -webkit-transition: -webkit-transform 0.4s;
    transition: transform 0.4s;
}


.chkbx-toggle:checked + label {
    background-color: #7d7aff;
}

.chkbx-toggle:checked + label::before {
    background-color: #6c6adb;
}

.chkbx-toggle:checked + label::after {
    -moz-transform: translateX(20px);
    -ms-transform: translateX(20px);
    -webkit-transform: translateX(20px);
    transform: translateX(20px);
}
</style>
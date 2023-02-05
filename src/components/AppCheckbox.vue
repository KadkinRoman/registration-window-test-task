<template>
  <div class="checkbox">
    <input  class="checkbox__input" type="checkbox" id="checkbox-input" :checked="isAgreement"
    @input="$emit('change', $event.target.checked)" >
    <label class="checkbox__label" for="checkbox-input">
      <span class="checkbox__span"></span> 
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'isAgreement',
    event: 'change'
  },
  props: {
    isAgreement: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.checkbox__input {
  display: none;
}

.checkbox__input+.checkbox__label {
  font-weight: normal;
  cursor: pointer;
}

.checkbox .checkbox__label {
  display: grid;
  grid-template-columns: 26px 1fr;
  max-width: 80%;
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  color: #000;
  gap: 5px;
}

.checkbox__input+.checkbox__label .checkbox__span {
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

.checkbox__input:checked+.checkbox__label .checkbox__span {
  background: var(--color-purple);
}

.checkbox__input:checked+.checkbox__label .checkbox__span::before {
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
</style>
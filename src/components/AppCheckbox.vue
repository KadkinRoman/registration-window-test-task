<template>
  <div :class="checkbox">
    <input type="checkbox" :id="newId" class="input" :checked="value" @change="$emit('input', $event.target.checked)">
    <label class="label" :for="newId">
      <p class="text">
        <slot></slot>
      </p>
    </label>

  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    checkbox: {
      type: String
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      newId: '',
    }
  },
  methods: {
    createId() {
      if (this.id.length > 0) {
        this.newId = this.id;
        return;
      }

      this.newId = Math.floor(Math.random() * Date.now());
    }
  },

  created() {
    this.createId();
  }
}
</script>

<style scoped>
/* toggle-checkbox */
.toggle-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-checkbox .input {
  display: none;
}

.toggle-checkbox .label {
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
  width: 40px;
  height: 20px;
  background-color: #e4e4e4;
  border-radius: 60px;
  transition: background 0.4s;
  margin: 0 15px 0 0;
}

.toggle-checkbox .label::before,
.toggle-checkbox .label::after {
  content: "";
  display: block;
  position: absolute;
}

.toggle-checkbox .label::before {
  right: 1px;
  left: 1px;
  top: 1px;
  bottom: 1px;
  background-color: #F1F1F1;
  border-radius: 60px;
  transition: background 0.4s;
}

.toggle-checkbox .label::after {
  top: -1px;
  left: 0;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 1px 5px rgb(0 0 0 / 30%);
  transition: transform 0.4s;
}


.toggle-checkbox .input:checked+.label {
  background-color: #7d7aff;
}

.toggle-checkbox .input:checked+.label::before {
  background-color: #6c6adb;
}

.toggle-checkbox .input:checked+.label::after {
  transform: translateX(20px);
}

.toggle-checkbox .text {
  padding: 0 0 0 55px;
  max-width: 680px;
}

/* checkbox */
.checkbox {
  display: flex;
}

.checkbox .input {
  display: none;
}

.checkbox .label {
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
  margin: 0 15px 0 0;
}

.checkbox .label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  background: #fff;
  border: 1px solid var(--color-purple);
  border-radius: 5px;
  transition: background 0.4s;
}

.checkbox .input:checked+.label:before {
  background: var(--color-purple);
}

.checkbox .input:checked+.label:after {
  content: '';
  position: absolute;
  left: 7px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid #fff;
  border-width: 2px 0 0 2px;
  transform: rotate(225deg);
  z-index: 2;
}

.checkbox .text {
  padding: 0 0 0 35px;
  max-width: 680px;
}
</style>
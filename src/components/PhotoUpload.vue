<script setup>
  import LoadingIcon from './icons/IconLoading.vue'
</script>

<template>
  <div class="photo">
    <label class="profile__label" for="image-uploads">
      <img v-if="photoSrc" class="photo__img" :src="photoSrc" />
      <span v-else class="loading-icon">
        <LoadingIcon />
      </span>
    </label>
    <input class="profile__input" @change="onFileChange" type="file" id="image-uploads"
      accept=".jpg, .jpeg, .png">
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: '',
      photoSrc: ''
    }
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files;

      if (!files.length) {
        return;
      }
      
      this.photo = files[0];
      this.photoSrc = URL.createObjectURL(files[0]);
      this.$emit('change', this.photo)
    },
  }
}
</script>

<style>
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
  cursor: pointer;
}

.photo__img:hover {
  opacity: .8;
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
</style>
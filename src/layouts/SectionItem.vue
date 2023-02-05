<template>
  <div class="section">
    <div class="container">
      <h2 class="title">
        <slot name="heading"></slot>
      </h2>
      <p class="main">
        <slot></slot>
      </p> 
    </div>

  </div>
</template>

<style scoped>
.section {
  padding: 30px 0;
}

.title {
  display: flex;
  margin: 0 0 15px 0;

  font-weight: 500;
  font-size: 16px;
  line-height: 119%;
  color: #000000;
}

.main {
  font-size: 14px;
  line-height: 136%;
  letter-spacing: -0.0015em;
  color: #696977;
}
</style>
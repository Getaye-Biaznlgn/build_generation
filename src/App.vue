<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.bg-dark-blue {
  background-color: #2f4587;
}
.bg-too-light-gray {
  background-color: #f3f4f6;
}
.warining input {
  border: 1px red solid;
}
.warining span {
  display: inline;
  color: red;
  font-size: 14px;
}

form i {
  cursor: pointer;
}
.img {
  height: 200px;
  max-width: 100%;
}
@media (min-width: 801px) {
  .img {
    width: 300px;
    height: 200px;
  }
}
</style>

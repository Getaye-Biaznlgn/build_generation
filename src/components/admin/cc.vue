<template>
  <div id="Image-chooser">
    <div class="input-container text-center">
      <input
        class="image-input"
        id="file-upload"
        type="file"
        multiple
        @change="uploadImage"
      />
      <label for="file-upload" class="choose-btn">Chosse Images</label>
      <div v-if="imageFiles.length" class="mt-3 text-white">
        {{ imageFiles.length + " Images Choosen" }}
      </div>
    </div>
    <div class="w-100 d-flex mb-3">
      <div v-for="(image, key) in imageFiles" :key="key" class="m-2 image-box">
        <img v-bind:ref="'image'" class="img-fluid" :alt="image.name" src="" />
        <button
          type="button"
          class="removebtn"
          @click="removeImage(image, key)"
        >
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      imageFiles: [],
    };
  },
  methods: {
    uploadImage(e) {
      let selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.imageFiles.push(selectedFiles[i]);
      }
      this.$emit("saveImage", this.imageFiles);
      this.applyImage();
    },

    removeImage(image, index) {
      this.imageFiles.splice(index, 1);
      this.$emit("saveImage", this.imageFiles);
      this.applyImage();
    },
    applyImage() {
      for (let i = 0; i < this.imageFiles.length; i++) {
        let reader = new FileReader();
        reader.onload = () => {
          this.$refs.image[i].src = reader.result;
        };
        reader.readAsDataURL(this.imageFiles[i]);
      }
    },
  },
};
</script>

<style scoped>
#Image-chooser {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 10%;
}
.input-container {
  width: 30%;
  height: 20vh;
  margin: auto;
  border: 1px dashed rgb(61, 54, 54);
  background-color: rgb(204, 204, 216);
}
.choose-btn {
  margin-top: 7%;
  background-color: rgb(11, 11, 168);
  color: #fff;
  padding: 2%;
  border: none;
  cursor: pointer;
}
.image-input {
  display: none;
}
.image-box {
  width: 15%;
  height: 20vh;
  position: relative;
  overflow: hidden;
}
.removebtn {
  position: absolute;
  top: 2%;
  right: 3%;
  border: 2px solid blue;
  border-radius: 50%;
  display: none;
}
.removebtn:hover {
  color: blue;
}

.image-box img {
  width: 100%;
  height: 100%;
  transition: all 1s;
}
.image-box img:hover {
  transform: scale(1.5) rotate(45deg);
}
.image-box:hover .removebtn {
  display: block;
}
</style>

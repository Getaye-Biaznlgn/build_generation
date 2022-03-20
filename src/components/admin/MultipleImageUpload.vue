<template>
  <div class="text-center wraper p-5">
    <input
      class="image-input"
      type="file"
      name="imageInpute"
      id="imageInpute"
      ref="imageHolder"
      accept="image/.*"
      multiple
      @change="fileHandler($event)"
    />
    <div
      class="imageContainer"
      :class="{ active: isActive }"
      @dragenter.prevent="activatClass()"
      @dragleave="activatClass()"
      @dragover.prevent=""
      @drop.prevent="fileHandler($event)"
    >
      <label for="imageInpute">
        <div class="fs-2 uploadIcon"><i class="fas fa-upload"></i></div>
        <p>Drag and drop Images here or</p>
        <div class="btn btnSelect m-2">Select Images</div>
        <div v-if="imageFiles?.length" class="m-2 text-black">
          {{ imageFiles?.length + " Images Choosen" }}
        </div>
      </label>
    </div>
  </div>
  <!-- image preview -->
  <div class="w-100 d-flex mb-3 imagePreview">
    <div v-for="(image, key) in imageFiles" :key="key" class="m-2 image-box">
      <img v-bind:ref="'image'" class="img-fluid" :alt="image.name" src="" />
      <button
        type="button"
        class="removebtn fs-4"
        @click="removeImage(image, key)"
      >
        X
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageFiles: [],
      isActive: false,
    };
  },
  methods: {
    fileHandler(e) {
      this.isActive = false;
      let selectedFiles =
        e.target.files || e.dataTransfer.files || this.$refs.imageHolder.files;
      for (let i = 0; i < selectedFiles?.length; i++) {
        this.imageFiles.push(selectedFiles[i]);
      }
      this.$emit("saveImage", this.imageFiles);

      this.applyImage();
    },
    removeImage(image, index) {
      //console.log(this.imageFiles);
      this.imageFiles.splice(index, 1);
      this.$emit("saveImage", this.imageFiles);

      this.applyImage();
      //this.$refs.image[index].src = "" // You are hidding the 3rd one that is now in index 1.
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
    activatClass() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style scoped>
.wraper {
  width: 100%;
  margin-left: 10%;
  margin-top: 7%;
}
.wraper input {
  visibility: hidden;
}
.imageContainer {
  width: 40%;
  height: auto;
  background: transparent;
  border: 2px dashed gray;
}
label {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.btnSelect {
  border: 1px solid gray;
  background-color: rgb(134, 134, 177);
  color: #fff;
}
.btnSelect:hover {
  background-color: rgb(95, 95, 160);
}
.imageContainer:hover {
  border-color: blue;
}
.uploadIcon:hover {
  color: blue;
}
.active {
  background-color: rgb(123, 123, 156);
  color: #fff;
  border-color: blue;
}
.imagePreview {
  overflow-x: auto;
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
  transform: scale(1.2);
}
.image-box:hover .removebtn {
  display: block;
}
</style>

<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state == $options.AllStates.loading }"
      :style="previewImg && `--bg-url: url('${previewImg}')`"
    >
      <span class="image-uploader__text">{{ stateText }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="fileSelect"
        @click="click"
      />
    </label>
  </div>
</template>

<script>

const AllStates = {
  empty: 'empty',
  loading: 'loading',
  loaded: 'loaded',
};

export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  AllStates,

  props: {
    preview: String,
    uploader: Function
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      state: this.preview ? AllStates.loaded : AllStates.empty,
      selectedImage: null
    }
  },

  computed: {
    stateText() {
      switch(this.state) {
        case AllStates.loading:
          return 'Загрузка...';
        case AllStates.loaded:
          return 'Удалить изображение';
        default:
          return 'Загрузить изображение';
      }
    },

    previewImg() {
      return this.selectedImage || this.preview;
    }
  },

  methods: {
    fileSelect(event) {
      let file = this.$refs["input"].files[0];
      this.selectedImage = URL.createObjectURL(file);

      this.$emit('select', file);

      this.state = AllStates.loading;

      if (this.uploader) {
        return this.uploader(file)
          .then((result) => {
            this.state = AllStates.loaded;
            this.$emit('upload', result);
          })
          .catch((error) => {
            this.state = AllStates.empty;
            this.removeFile();
            this.$emit('error', error);
          })
          .finally(() => {
            this.selectedImage = null;
          });
      }
      else {
        this.state = AllStates.loaded;
        return;
      }
    },

    click(event) {
      if (this.state == AllStates.loading) {
        event.preventDefault();
      }
      else if (this.state == AllStates.loaded) {
        event.preventDefault();
        this.removeFile();
        this.state = AllStates.empty;
        this.$emit('remove');
      }
    },

    removeFile() {
      this.selectedImage = null;
      this.$refs["input"].value = '';
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>

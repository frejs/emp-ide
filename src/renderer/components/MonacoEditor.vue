<template>
  <div ref="editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'javascript'
    },
    theme: {
      type: String,
      default: 'vs-dark'
    },
    options: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      $editor: null
    };
  },
  watch: {
    value(newValue) {
      if (newValue !== this.$editor.getValue()) {
        this.$editor.setValue(newValue);
      }
    }
  },
  methods: {
    updateValue() {
      this.$emit('input', this.$editor.getValue());
    },
    updateDimensions() {
      this.$editor.layout();
    }
  },
  created() {
    this.$nextTick(() => {
      const editor = monaco.editor.create(this.$refs.editor, {
        value: this.value,
        language: this.language,
        theme: this.theme
      });

      editor.onKeyUp(() => this.updateValue());
      editor.onMouseUp(() => this.updateValue());
      this.$editor = editor;
    });
  },
  mounted() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }
};
</script>
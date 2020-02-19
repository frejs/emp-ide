<template>
  <div :class="classnames" :style="{ cursor, userSelect }" @mousedown.stop="onMouseDown">
    <slot></slot>
  </div>
</template>

<script src="./multipanel.js"></script>

<style lang="less" scoped>
.multipanel {
  display: flex;

  &.layout-h {
    flex-direction: column;
  }

  &.layout-v {
    flex-direction: row;
  }
}

.multipanel > div {
  position: relative;
  z-index: 1;
}

.multipanel-resizer {
  display: block;
  position: relative;
  z-index: 2;
}

.layout-h > .multipanel-resizer {
  width: 100%;
  height: 10px;
  margin-top: -10px;
  top: 5px;
  cursor: row-resize;
}

.layout-v > .multipanel-resizer {
  width: 10px;
  height: 100%;
  margin-left: -10px;
  left: 5px;
  cursor: col-resize;
}
</style>

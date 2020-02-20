<template>
  <div
    class="simulator-wrapper"
    :style="{
      'min-width': `${simulatorConfig.width + 20}px`,
      'width': `${simulatorConfig.width + 20}px`
    }"
  >
    <div class="simulator-header">
      <select class="simulator-plugin-device-type" v-model="selectedDeviceTypeIndex">
        <option
          v-for="(deviceType, index) in deviceTypeConfig"
          :key="deviceType.name"
          :value="index"
        >{{deviceType.name}} ({{deviceType.width}}x{{deviceType.height}}, {{deviceType.dpr}})</option>
      </select>
      <select class="simulator-plugin-device-size">
        <option
          v-for="deviceSize in deviceSizeConfig"
          :key="deviceSize.label"
          :value="deviceSize.value"
        >{{deviceSize.label}}</option>
      </select>
    </div>
    <div class="simulator-content">
      <webview
        id="simulator"
        class="webview"
        src="http://localhost:8000"
        :style="{ width: `${simulatorConfig.width}px`, height: `${simulatorConfig.height}px` }"
      ></webview>
    </div>
    <div class="simulator-footer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceTypeConfig: [
        {
          name: 'iPhone5',
          width: 310,
          height: 568,
          dpr: 2,
          ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) tbe/0.2.4 Chrome/58.0.3029.110 Electron/1.7.12 Mobile/15A372  Safari/537.36'
        },
        {
          name: 'iPhone6',
          width: 375,
          height: 667,
          dpr: 2,
          ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) tbe/0.2.4 Chrome/58.0.3029.110 Electron/1.7.12 Mobile/15A372 Safari/537.36'
        },
        {
          name: 'iPhone6 Plus',
          width: 414,
          height: 736,
          dpr: 3,
          ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) tbe/0.2.4 Chrome/58.0.3029.110 Electron/1.7.12 Mobile/15A372 Safari/537.36'
        },
        {
          name: 'Galaxy S5',
          width: 385,
          height: 640,
          dpr: 3,
          ua: 'Mozilla/5.0 (Linux; Android 4.4.2; SM-G900H Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) tbe/0.2.4 Chrome/58.0.3029.110 Electron/1.7.12 Mobile/15A372 Safari/537.36'
        },
        {
          name: 'Nexus 5x',
          width: 411,
          height: 731,
          dpr: 2.6,
          ua: 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 5 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) tbe/0.2.4 Chrome/58.0.3029.110 Electron/1.7.12 Mobile/15A372 Safari/537.36'
        },
        {
          name: 'Nexus 6',
          width: 412,
          height: 732,
          dpr: 3.5,
          ua: 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 5 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) tbe/0.2.4 Chrome/58.0.3029.110 Electron/1.7.12 Mobile/15A372 Safari/537.36'
        }
      ],
      deviceSizeConfig: [
        { label: '100%', value: 1 },
        { label: '85%', value: 0.85 },
        { label: '75%', value: 0.75 },
        { label: '50%', value: 0.5 }
      ],
      simulatorConfig: {},
      selectedDeviceTypeIndex: 0
    };
  },
  mounted() {
    this.simulatorConfig = this.deviceTypeConfig[0];
  },
  watch: {
    selectedDeviceTypeIndex() {
      this.simulatorConfig = this.deviceTypeConfig[this.selectedDeviceTypeIndex];
    },
    simulatorConfig() {
      this.$emit('selected', {
        width: this.simulatorConfig.width + 20
      });
    }
  }
};
</script>

<style>
.simulator-header {
  position: absolute;
  width: 100%;
  height: 35px;
  padding: 0 10px;
  line-height: 35px;
  background: #282c35;
}

.simulator-header select {
  max-width: 100%;
  appearance: menu;
  color: #fff;
  background: none;
  outline: none;
  border: none;
}

.simulator-content {
  position: absolute;
  top: 35px;
  bottom: 35px;
  width: 100%;
  overflow: scroll;
  background-color: #17171f;
}

.simulator-content .webview {
  margin: 30px auto 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.simulator-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 35px;
  background: #252526;
}
</style>
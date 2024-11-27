<template>
  <div class="appView">
    <div class="instruction-text">
      {{ currentText }}
    </div>
    <ImgCtrl v-model:currentWord="wordInfo" v-model:position="currentPosition" />
    <div class="notebook">
      <div v-if="wordInfo" class="word-info">
        <p>{{ wordInfo.jp }} - {{ wordInfo.pt }} ({{ wordInfo.en }})</p>
        <p>{{ wordInfo.jpP }}</p>
        <p>{{ wordInfo.yomi }}</p>
        <p>{{ wordInfo.ptP }}</p>
        <p>{{ wordInfo.enP }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ImgCtrl from '@/components/ImgCtrl.vue'
import { instruction } from '@/stores/instruction.js'

const currentText = ref(instruction[0])
const wordInfo = ref(null)
const currentPosition = ref(0)

watch(currentPosition, (newPosition) => {
  currentText.value = instruction[newPosition]
})
</script>

<style scoped>
.appView {
  background-color: white;
  background-image:
    /* Red margin line
    linear-gradient(90deg, transparent 40px, #ff000033 40px, #ff000033 42px, transparent 42px),
    */
    /* Horizontal lines */ linear-gradient(
    #00000012 1px,
    transparent 1px
  );
  background-size: 100% 32px;
  background-position: 0 0;
}

.instruction-text {
  text-align: center;
  margin: 20px;
  font-size: 1.2em;
}

.word-info {
  margin: 20px;
  text-align: center;
}

.word-info p {
  margin: 10px 0;
}
</style>

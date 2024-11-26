<template>
  <main>
    <div class="instruction-text">
      {{ currentText }}
    </div>
    <ImgCtrl v-model:currentWord="wordInfo" v-model:position="currentPosition" />
    <div v-if="wordInfo" class="word-info">
      <p>{{ wordInfo.jp }} - {{ wordInfo.pt }} ({{ wordInfo.en }})</p>
      <p>{{ wordInfo.jpP }}</p>
      <p>{{ wordInfo.yomi }}</p>
      <p>{{ wordInfo.ptP }}</p>
      <p>{{ wordInfo.enP }}</p>
    </div>
  </main>
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

<style>
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

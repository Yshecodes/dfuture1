<template>
  <div class="img-ctrl">
    <button @click="widgetUpdateL">L</button>
    <div ref="widgetContainer" id="widget"></div>
    <button @click="widgetUpdateR">R</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { animateSVG } from '@/stores/animate.js'
import { hiragana } from '@/stores/hiragana.js'

const emit = defineEmits(['update:currentWord', 'update:position'])
const widgetContainer = ref(null)
const BASE_SVG_PATH = '/svg/'
const currentPosition = ref(0)

const displayOrder = [
  { type: 'roman' },
  { type: 'japan' },
  { type: 'noun', number: 1 },
  { type: 'noun', number: 2 },
  { type: 'noun', number: 3 },
  { type: 'verb', number: 1 },
  { type: 'verb', number: 2 },
  { type: 'verb', number: 3 },
]

function getCurrentInfo() {
  const current = displayOrder[currentPosition.value]
  const letter = 'a'

  if (current.type === 'roman' || current.type === 'japan') {
    return {
      svgPath: hiragana[letter][current.type],
      wordData: null,
    }
  } else {
    const wordObj = Object.values(hiragana[letter][current.type][current.number])[0]
    return {
      svgPath: wordObj.svg,
      wordData: {
        ...wordObj,
        type: current.type,
      },
    }
  }
}

async function loadAndCheckSvg(svgPath) {
  try {
    const response = await fetch(BASE_SVG_PATH + svgPath)
    const svgText = await response.text()

    widgetContainer.value.innerHTML = svgText

    const svg = widgetContainer.value.querySelector('svg')
    if (svg.getAttribute('data-animate') === 'true') {
      animateSVG(svg)
    }
  } catch (error) {
    console.error('Error loading SVG:', error)
  }
}

function widgetUpdateL() {
  if (currentPosition.value > 0) {
    currentPosition.value--
    const info = getCurrentInfo()
    loadAndCheckSvg(info.svgPath)
    emit('update:currentWord', info.wordData)
    emit('update:position', currentPosition.value)
  }
}

function widgetUpdateR() {
  if (currentPosition.value < displayOrder.length - 1) {
    currentPosition.value++
    const info = getCurrentInfo()
    loadAndCheckSvg(info.svgPath)
    emit('update:currentWord', info.wordData)
    emit('update:position', currentPosition.value)
  }
}

onMounted(() => {
  const info = getCurrentInfo()
  loadAndCheckSvg(info.svgPath)
  emit('update:currentWord', info.wordData)
  emit('update:position', currentPosition.value)
})
</script>

<style>
.img-ctrl {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

#widget svg {
  width: 249px;
  height: 249px;
  border: solid yellow 5px;
}

.img-ctrl {
  position: relative;
}
</style>

<template>
  <div class="img-ctrl">
    <button class="icon-button" @click="widgetUpdateL">
      <SvgIcon type="mdi" :path="mdiChevronLeft" size="86" class="svg-icon" />
    </button>
    <div ref="widgetContainer" id="widget"></div>
    <button class="icon-button" @click="widgetUpdateR">
      <SvgIcon type="mdi" :path="mdiChevronRight" size="86" class="svg-icon" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { animateSVG } from '@/stores/animate.js'
import { hiragana } from '@/stores/hiragana.js'

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronLeft } from '@mdi/js'
import { mdiChevronRight } from '@mdi/js'

const emit = defineEmits(['update:currentWord', 'update:position'])
const widgetContainer = ref(null)
const BASE_SVG_PATH = '/svg/'
const currentPosition = ref(0)
const currentLetter = ref('a')

const hiraganaOrder = ['a', 'i', 'u', 'e', 'o']

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
  const letter = currentLetter.value

  if (current.type === 'roman' || current.type === 'japan') {
    return {
      svgPath: hiragana[letter][current.type],
      wordData: null,
    }
  } else {
    const letterData = hiragana[letter]
    if (letterData && letterData[current.type] && letterData[current.type][current.number]) {
      const wordObj = Object.values(letterData[current.type][current.number])[0]
      return {
        svgPath: wordObj.svg,
        wordData: {
          ...wordObj,
          type: current.type,
        },
      }
    }
    return null
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

function moveToNextLetter() {
  const currentIndex = hiraganaOrder.indexOf(currentLetter.value)
  if (currentIndex < hiraganaOrder.length - 1) {
    currentLetter.value = hiraganaOrder[currentIndex + 1]
    currentPosition.value = 0
    return true
  }
  return false
}

function moveToPreviousLetter() {
  const currentIndex = hiraganaOrder.indexOf(currentLetter.value)
  if (currentIndex > 0) {
    currentLetter.value = hiraganaOrder[currentIndex - 1]
    currentPosition.value = displayOrder.length - 1
    return true
  }
  return false
}

function findLastValidPosition(letter) {
  for (let i = displayOrder.length - 1; i >= 0; i--) {
    currentPosition.value = i
    const info = getCurrentInfo()
    if (info) {
      return i
    }
  }
  return 0
}

function widgetUpdateL() {
  if (currentPosition.value > 0) {
    currentPosition.value--
    const info = getCurrentInfo()
    if (info) {
      loadAndCheckSvg(info.svgPath)
      emit('update:currentWord', info.wordData)
      emit('update:position', currentPosition.value)
    }
  } else {
    if (moveToPreviousLetter()) {
      const lastPosition = findLastValidPosition(currentLetter.value)
      currentPosition.value = lastPosition
      const newInfo = getCurrentInfo()
      if (newInfo) {
        loadAndCheckSvg(newInfo.svgPath)
        emit('update:currentWord', newInfo.wordData)
        emit('update:position', currentPosition.value)
      }
    }
  }
}

function widgetUpdateR() {
  if (currentPosition.value < displayOrder.length - 1) {
    currentPosition.value++
    const info = getCurrentInfo()
    if (!info) {
      if (moveToNextLetter()) {
        const newInfo = getCurrentInfo()
        if (newInfo) {
          loadAndCheckSvg(newInfo.svgPath)
          emit('update:currentWord', newInfo.wordData)
          emit('update:position', currentPosition.value)
        }
      }
    } else {
      loadAndCheckSvg(info.svgPath)
      emit('update:currentWord', info.wordData)
      emit('update:position', currentPosition.value)
    }
  } else {
    if (moveToNextLetter()) {
      const newInfo = getCurrentInfo()
      if (newInfo) {
        loadAndCheckSvg(newInfo.svgPath)
        emit('update:currentWord', newInfo.wordData)
        emit('update:position', currentPosition.value)
      }
    }
  }
}

onMounted(() => {
  const info = getCurrentInfo()
  if (info) {
    loadAndCheckSvg(info.svgPath)
    emit('update:currentWord', info.wordData)
    emit('update:position', currentPosition.value)
  }
})
</script>

<style>
.img-ctrl {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
}

#widget svg {
  width: 209px;
  height: 209px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.img-ctrl {
  position: relative;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  color: #4dadf9;
}

.icon-button:hover .svg-icon {
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.4));
}

.svg-icon {
  transition: filter 0.3s ease;
}
</style>

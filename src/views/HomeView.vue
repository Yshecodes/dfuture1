<template>
  <main class="home-container">
    <h2 class="titulo">
      Olá! Sou o Corajão e vou te ajudar nessa aventura de aprendizado da lingua japonesa!
    </h2>

    <div class="svg-container">
      <object id="corajao" data="/svg/corajao.svg" type="image/svg+xml"></object>
    </div>
    <div class="nameBox">
      <input type="text" name="username" placeholder="Digite seu nome aqui" />
      <br />
      <button @click="toApp" class="start" id="startBtn" value="start">Começar</button>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  display: inside;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #2ebe87;
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.641);
}

.svg-container {
  position: relative;
  margin-top: 15px;
  width: 390px;
  height: 400px;
}

.titulo {
  color: rgb(92, 93, 140);
  text-shadow: rgb(36, 62, 128);
  background-color: rgb(255, 255, 255);
  margin-top: 15px;
  padding: 20px;
  transition: all 0.5s ease;
}

.nameBox {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/svg/pencil.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  z-index: 1;
  height: 400px;
  position: relative;
}

.nameBox input {
  border-radius: 30px;
  padding: 10px;
  font-size: 12px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 31%;
  transform: translate(-50%, -50%);
}

.start {
  margin-top: 20px;
  position: relative;
  padding: 20px 30px;
  background-color: transparent;
  cursor: pointer;
  transition: 0.4s;
  box-shadow: 0 7px 20px rgb(248, 246, 246);
  color: rgb(244, 249, 246);
  border: none;
  border-radius: 30px;
  font-size: 25px;
}

.start:hover{
  background-color: white;
  box-shadow: 0 7px 50px rgb(255, 255, 255);
  color: green;
  font-size: 30px;
}

#corajao {
  position: absolute;
  flex-shrink: 0;
  min-width: 450px;
  min-height: 450px;
  left: 50%;
  top: 60%;
  transform: translate(-60%, -50%);
}
</style>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const toApp = () => {
  router.push('/appView')
}
</script>

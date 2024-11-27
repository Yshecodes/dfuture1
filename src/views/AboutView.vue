<template>
  <div class="about">
    <CounterComp />
    <div class="head">
      <h1>DFuture</h1>
      <h3>Projeto Educacional</h3>
      <p>Fundadoras: Sheila V. de Souza e Aline Sugisaki da Silva</p>
      <div class="mission">
        <h2>Nossa Missão</h2>
        <p>
          Nossa iniciativa nasceu de um sonho: criar pontes entre culturas e abrir portas para o
          futuro de crianças estrangeiras nas escolas japonesas.
        </p>
      </div>
      <div class="method">
        <h2>Como Atuamos</h2>
        <p>
          Através de um método acolhedor e personalizado, ajudamos essas pequenas mentes brilhantes
          a dominarem os três pilares da escrita japonesa:
        </p>
        <ul>
          <li>Hiragana</li>
          <li>Katakana</li>
          <li>Kanji</li>
        </ul>
      </div>
      <div class="vision">
        <h2>Nossa Visão</h2>
        <p>Mais do que ensinar caracteres, construímos a base para que cada criança possa:</p>
        <ul>
          <li>Se expressar com confiança</li>
          <li>Criar laços de amizade verdadeiros com seus colegas</li>
          <li>Participar ativamente das aulas</li>
        </ul>
      </div>
      <div class="impact">
        <h2>Nosso Impacto</h2>
        <p>
          Esperamos que cada palavra aprendida, traga sorrisos e faça florecer um sentimento
          crescente de pertencimento. Porque acreditamos que toda criança merece não apenas estudar,
          mas verdadeiramente brilhar em seu novo lar.
        </p>
      </div>
      <div class="definition">
        <h2>Por que DFuture?</h2>
        <p>
          O "D" em DFuture representa Define (Definir). Acreditamos profundamente que a educação é a
          chave que abre um mundo de possibilidades. Quando capacitamos crianças através do
          aprendizado, oferecemos as ferramentas para que elas Definam seus próprios caminhos,
          moldem seus sonhos e criem o futuro (Future) que imaginam para si. Porque toda criança
          merece o poder de escrever sua própria história.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
h1,
h2 {
  color: var(--color-heading);
}
</style>

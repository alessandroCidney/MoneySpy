<template>
  <div class="defaultPageContainer">
    <h1 class="mb-4">
      Conquistas
    </h1>

    <p class="mb-8">
      Acompanhe o seu progresso na plataforma e desbloqueie recompensas!
    </p>

    <section class="achievementsList">
      <header class="onlyForScreenReader">
        <h2 class="d-none">
          Lista de conquistas
        </h2>
      </header>

      <article
        v-for="(achievementData, achievementIndex) in achievementsList"
        :key="`achievementIndex${achievementIndex}`"
        :class="{
          'defaultWhiteCard achievementCard text-center': true,
          'complete': achievementData.complete,
        }"
      >
        <header>
          <v-avatar
            :color="achievementData.color"
            class="achievementIcon mb-3"
            size="120"
          >
            <v-icon size="70">
              {{ achievementData.icon }}
            </v-icon>
          </v-avatar>

          <h3>
            {{ achievementData.title }}
          </h3>
        </header>

        <section>
          <p>{{ achievementData.description }}</p>
        </section>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'authenticated',
})

const achievementsList = ref([
  {
    icon: 'mdi-calendar-today',
    color: 'primary',
    title: 'Novato',
    description: 'Entre pela primeira vez.',
    complete: true,
  },
  {
    icon: 'mdi-calendar-range',
    color: 'primary',
    title: 'Curioso',
    description: 'Entre por 3 dias seguidos.',
    complete: true,
  },
  {
    icon: 'mdi-calendar-week',
    color: 'primary',
    title: 'Honorário',
    description: 'Entre por 7 dias seguidos.',
    complete: true,
  },
  {
    icon: 'mdi-calendar-month',
    color: 'primary',
    title: 'Esforçado',
    description: 'Entre por 30 dias seguidos.',
    complete: true,
  },
  {
    icon: 'mdi-calendar-check',
    color: 'primary',
    title: 'Imortal',
    description: 'Entre por 3 meses seguidos.',
    complete: true,
  },
  {
    icon: 'mdi-calendar-star',
    color: 'secondary',
    title: 'Lendário',
    description: 'Entre por 1 ano.',
    complete: true,
  },
  {
    icon: 'mdi-scale-balance',
    color: 'primary',
    title: 'Tudo Sob Controle',
    description: 'Mantenha os gastos de 1 semana abaixo de 100 "dinheiros" por dia.',
    complete: true,
  },
  {
    icon: 'mdi-cash',
    color: 'primary',
    title: 'Compra do Ano',
    description: 'Faça um único gasto acima de 1000 "dinheiros".',
    complete: true,
  },
  {
    icon: 'mdi-hand-heart',
    color: 'red',
    title: 'Amoroso',
    description: 'Faça uma doação.',
    complete: true,
  },
  {
    icon: 'mdi-handshake',
    color: 'secondary',
    title: 'Amigo',
    description: 'Compartilhe o app com outra pessoa.',
    complete: true,
  },
  {
    icon: 'mdi-close-box',
    color: 'error',
    title: 'Mentiroso',
    description: 'Confesse um registro propositalmente incorreto.',
    complete: true,
  },
  {
    icon: 'mdi-translate-variant',
    color: 'primary',
    title: 'Poliglota',
    description: 'Use o app em um idioma diferente do padrão por 1 semana.',
    complete: true,
  },
  {
    icon: 'mdi-lightbulb-on',
    color: 'primary',
    title: 'Conselheiro',
    description: 'Envie uma ideia ou sugestão.',
    complete: true,
  },
  {
    icon: 'mdi-incognito',
    color: 'primary',
    title: 'Vigilante',
    description: 'Reporte um problema.',
    complete: true,
  },
  {
    icon: 'mdi-meditation',
    color: 'secondary',
    title: 'Transcendental',
    description: 'Complete todas as conquistas.',
    complete: true,
  },
])
</script>

<style lang="scss" scoped>
.achievementsList {
  display: grid;

  // https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

  gap: 24px;

  .achievementCard {
    aspect-ratio: 1 / 1;

    &:not(.complete) {
      opacity: 0.5;
    }

    h3 {
      font-size: 1.5rem;
    }
  }
}
</style>

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
        v-for="(achievementData, achievementIndex) in achievementsStore.items"
        :key="`achievementIndex${achievementIndex}`"
        :class="{
          'defaultWhiteCard achievementCard text-center d-flex align-center justify-space-between flex-column': true,
        }"
      >
        <div>
          <v-avatar
            :color="getAchievementProgress(achievementData) === 0 ? 'grey' : vuetifyTheme.current.value.colors[achievementData.color]"
            class="achievementIcon mb-3"
            size="150"
          >
            <v-icon
              size="80"
            >
              {{ achievementData.icon }}
            </v-icon>
          </v-avatar>
        </div>

        <div class="w-100">
          <h3>
            {{ achievementData.title }}
          </h3>

          <p class="mb-10">
            {{ achievementData.description }}
          </p>

          <div class="w-100 d-flex align-center justify-center ga-2">
            <v-progress-linear
              :model-value="getAchievementProgress(achievementData)"
              :color="getAchievementProgress(achievementData) === 100 ? 'primary' : 'blue'"
              height="12"
              rounded
            />

            <span class="font-weight-medium">
              {{ achievementData.currentStep }}/{{ achievementData.totalSteps }}
            </span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

definePageMeta({
  middleware: 'authenticated',
})

const achievementsStore = useAchievementsStore()

const vuetifyTheme = useTheme()

function getAchievementProgress(achievementData: AchivementData) {
  return achievementData.currentStep / achievementData.totalSteps * 100
}
</script>

<style lang="scss" scoped>
.achievementsList {
  display: grid;

  // https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  gap: 24px;

  .achievementCard {
    aspect-ratio: 3 / 4;

    &.zeroProgress {
      opacity: 0.5;
    }

    h3 {
      font-size: 1.5rem;
    }
  }
}
</style>

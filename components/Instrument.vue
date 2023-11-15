<template>
  <div class="flex gap-4 items-center">
    <p class="w-28 shrink-0 text-right uppercase">{{ name }}</p>
    <div class="flex gap-4">
      <Step
        v-for="(step, index) in _sequence"
        :key="index"
        :velocity="step"
        :active="isPlaying && index + 1 === currentStep"
        :aria-label="`${name} - Step ${index + 1} of 16`"
        @change="$velocity => updateSequence($velocity, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  sequence: number[]
}>()

const { currentStep, isPlaying } = usePlayback()

const _sequence = ref(props.sequence)

const updateSequence = (velocity: number, index: number) => {
  _sequence.value[index] = velocity
}
</script>

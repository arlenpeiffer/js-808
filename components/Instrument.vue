<template>
  <div class="flex gap-4 items-center">
    <p class="w-28 shrink-0 font-semibold text-right tracking-wider uppercase">{{ name }}</p>
    <div class="flex gap-4">
      <Step
        v-for="(step, index) in _sequence"
        :key="index"
        :velocity="step"
        :active="isPlaying && index + 1 === currentStep"
        :aria-label="`${name} - Step ${index + 1} of 16`"
        @change="$velocity => updateSequence($velocity, index)"
        @play="makeNoise"
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

// logging each time a step emits a play event - could be hooked up to trigger an instrument's sound
const makeNoise = () => console.log(`${props.name} made a noise 🥁`)
</script>

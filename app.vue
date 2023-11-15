<template>
  <main class="p-10">
    <div class="flex justify-between items-end">
      <h1 class="text-3xl">JS-808-A</h1>
      <section aria-label="Playback controls" class="flex gap-2">
        <button class="b b-solid b-black p-2" @click="play">
          {{ isPlaying ? 'Pause' : 'Play' }}
        </button>
        <button class="b b-solid b-black p-2" @click="stop">Stop</button>
        <div class="space-x-2">
          <input
            v-model="bpm"
            id="bpm"
            type="number"
            min="0"
            class="w-16 b b-solid b-black p-2"
          />
          <label for="bpm" id="bpm-label">BPM</label>
        </div>
        <input
          v-model="bpm"
          type="range"
          min="30"
          max="250"
          aria-labelledby="bpm-label"
        />
      </section>
    </div>
    <div class="mt-8 space-y-4">
      <div class="flex gap-4 pl-32">
        <div v-for="step in 16" :key="step" class="w-11 shrink-0">
          <p class="text-xs text-center">{{ step }}</p>
          <div
            class="mt-1 mx-auto h-3 w-3 rounded-full b b-solid b-black"
            :class="{ 'bg-green': isPlaying && step === currentStep }"
          ></div>
        </div>
      </div>
      <Instrument
        v-for="({ name, sequence }, index) in pattern.instruments"
        :key="index"
        :name="name"
        :sequence="sequence"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
const { bpm, currentStep, isPlaying, play, stop } = usePlayback()

const pattern = {
  id: '1',
  name: 'Pattern 1',
  bpm: 120,
  instruments: [
    {
      name: 'Kick',
      sequence: [127, 0, 0, 0, 127, 0, 0, 0, 127, 0, 0, 0, 127, 0, 0, 0]
    },
    {
      name: 'Snare',
      sequence: [0, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 127, 0, 0, 0]
    },
    {
      name: 'Open Hat',
      sequence: [0, 0, 127, 0, 0, 0, 127, 0, 0, 0, 127, 0, 0, 0, 127, 0]
    },
    {
      name: 'Closed Hat',
      sequence: [127, 0, 0, 0, 127, 0, 0, 0, 127, 0, 0, 0, 127, 0, 0, 0]
    }
  ]
}
</script>

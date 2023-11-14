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
    <div>Step: {{ currentStep }}</div>
  </main>
</template>

<script setup lang="ts">
const { bpm, currentStep, isPlaying, play, stop } = usePlayback()
</script>

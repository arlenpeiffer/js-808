<template>
  <div class="grid place-items-center min-h-screen">
    <main class="w-288 bg-orange-50 b b-solid b-current p-10">
      <div class="flex justify-between items-end">
        <h1 class="font-display text-5xl c-orange-600">JS-808-A</h1>
        <div class="flex items-center gap-4">
          <section aria-label="Playback controls" class="flex gap-2">
            <button
              :aria-label="isPlaying ? 'Pause' : 'Play'"
              class="b b-solid b-current p-1"
              :class="isPlaying ? 'c-orange-600' : 'hover:c-orange-600'"
              @click="play"
            >
              <svg
                v-if="isPlaying"
                width="32"
                height="32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.67 6.67c-.37 0-.67.3-.67.66v17.34c0 .36.3.66.67.66h4c.36 0 .66-.3.66-.66V7.33c0-.36-.3-.66-.66-.66h-4ZM19.33 6.67c-.36 0-.66.3-.66.66v17.34c0 .36.3.66.66.66h4c.37 0 .67-.3.67-.66V7.33c0-.36-.3-.66-.67-.66h-4Z"
                  fill="currentColor"
                />
              </svg>
              <svg v-else width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.67 6.65c0-.54.62-.86 1.06-.53l12.65 9.34c.36.27.36.8 0 1.08l-12.65 9.34a.67.67 0 0 1-1.06-.53V6.65Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              aria-label="Stop"
              class="b b-solid b-current p-1 hover:c-orange-600"
              @click="stop"
            >
              <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.67 8C8.3 8 8 8.3 8 8.67v14.66c0 .37.3.67.67.67h14.66c.37 0 .67-.3.67-.67V8.67c0-.37-.3-.67-.67-.67H8.67Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <div class="space-x-2">
              <input
                v-model="bpm"
                id="bpm"
                type="number"
                min="0"
                class="w-16 bg-transparent b b-solid b-current p-2"
              />
              <label for="bpm" id="bpm-label">BPM</label>
            </div>
            <input v-model="bpm" type="range" min="30" max="250" aria-labelledby="bpm-label" />
          </section>
          <section aria-label="Pattern chooser">
            <label for="pattern" class="sr-only">Pattern</label>
            <select
              v-model="selectedPatternId"
              id="pattern"
              class="bg-transparent b b-solid b-current p-2"
              @update:model-value="loadPattern"
            >
              <option v-for="{ id, name } in patterns" :key="id" :value="id">
                {{ name }}
              </option>
            </select>
          </section>
        </div>
      </div>
      <section aria-label="Pattern editor" class="mt-8 space-y-4">
        <div class="flex gap-4 pl-32">
          <div v-for="step in 16" :key="step" class="w-11 shrink-0">
            <p class="text-xs text-center">{{ step }}</p>
            <div
              class="mt-1 mx-auto h-3 w-3 rounded-full b b-solid b-current"
              :class="{ 'bg-amber-400': isPlaying && step === currentStep }"
            ></div>
          </div>
        </div>
        <Instrument
          v-for="({ name, sequence }, index) in selectedPattern?.instruments"
          :key="`${selectedPatternId}-${index}`"
          :name="name"
          :sequence="sequence"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Pattern } from './types'

useHead({
  bodyAttrs: {
    class: 'bg-stone-600 c-stone-800'
  }
})

const { bpm, currentStep, isPlaying, play, stop } = usePlayback()

// making this a reactive value so that actions like saving changes or adding/removing patterns could be implemented down the line
const patterns = ref([
  {
    id: '1',
    name: 'Disco',
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
  },
  {
    id: '2',
    name: 'Footwork',
    bpm: 160,
    instruments: [
      {
        name: 'Kick',
        sequence: [127, 0, 0, 127, 0, 0, 127, 0, 127, 0, 0, 127, 0, 0, 127, 0]
      },
      {
        name: 'Snare',
        sequence: [0, 127, 0, 127, 0, 127, 127, 0, 127, 0, 127, 0, 127, 127, 0, 127]
      },
      {
        name: 'Clap',
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Rim',
        sequence: [127, 127, 127, 127, 0, 127, 127, 127, 127, 127, 127, 127, 127, 127, 0, 127]
      }
    ]
  },
  {
    id: '3',
    name: 'Hip Hop',
    bpm: 85,
    instruments: [
      {
        name: 'Kick',
        sequence: [127, 0, 0, 0, 0, 0, 0, 127, 127, 0, 127, 0, 0, 0, 0, 0]
      },
      {
        name: 'Snare',
        sequence: [0, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 127, 0, 0, 0]
      },
      {
        name: 'Open Hat',
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 0]
      },
      {
        name: 'Closed Hat',
        sequence: [127, 0, 127, 0, 127, 0, 127, 0, 127, 0, 127, 0, 127, 0, 0, 0]
      }
    ]
  },
  {
    id: '4',
    name: 'Create your own',
    bpm: 128,
    instruments: [
      {
        name: 'Kick',
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Snare',
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Open Hat',
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Closed Hat',
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  }
])

const selectedPatternId = ref(patterns.value[0].id)

const selectedPattern = computed(() =>
  patterns.value.find(pattern => pattern.id === selectedPatternId.value)
)

const loadPattern = (id: string) => {
  stop()

  const pattern = patterns.value.find(pattern => pattern.id === id) as Pattern

  selectedPatternId.value = pattern.id
  bpm.value = pattern.bpm
}
</script>

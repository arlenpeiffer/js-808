import { createGlobalState } from '@vueuse/core'

export const usePlayback = createGlobalState(() => {
  const bpm = ref(120)
  const currentStep = ref(1)
  const ONE_MINUTE = 60 * 1000
  const interval = computed(() => ONE_MINUTE / bpm.value / 4)

  const {
    isActive: isPlaying,
    pause,
    resume
  } = useIntervalFn(
    () => {
      if (currentStep.value < 16) {
        currentStep.value++
      } else {
        reset()
      }
    },
    () => interval.value,
    { immediate: false }
  )

  const play = () => {
    isPlaying.value ? pause() : resume()
  }

  const reset = () => {
    currentStep.value = 1
  }

  const stop = () => {
    pause()
    reset()
  }

  return {
    bpm,
    currentStep,
    isPlaying,
    play,
    stop
  }
})

<template>
  <button
    :aria-pressed="pressed"
    class="relative h-14 w-11 b b-solid b-current"
    :class="[
      {
        'after:(content-empty absolute top-2 left-1/2 transform -translate-x-1/2 h-3 w-3 rounded-full)':
          pressed
      },
      pressed && active
        ? 'bg-orange-600 after:bg-orange-50'
        : 'hover:bg-orange-200 after:bg-orange-600'
    ]"
    @click="toggle"
  ></button>
</template>

<script setup lang="ts">
const props = defineProps<{
  velocity: number
  active: boolean
}>()

const emit = defineEmits<{
  change: [velocity: number]
  play: []
}>()

const pressed = computed(() => props.velocity > 0)

const toggle = () => {
  emit('change', props.velocity ? 0 : 127)
}

whenever(
  () => props.active && pressed.value,
  () => emit('play')
)
</script>

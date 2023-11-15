<template>
  <button
    :aria-pressed="pressed"
    class="relative h-14 w-11 b b-solid b-black"
    :class="{
      'after:(content-empty absolute top-2 left-1/2 transform -translate-x-1/2 h-3 w-3 bg-black rounded-full)':
        pressed,
      'bg-green': pressed && active
    }"
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
}>()

const pressed = computed(() => props.velocity > 0)

const toggle = () => {
  emit('change', props.velocity ? 0 : 127)
}
</script>

<template>
  <button
    :aria-pressed="pressed"
    class="h-11 w-11 b b-solid b-black"
    :class="{ 'bg-green': pressed && active }"
    @click="toggle"
  >
    {{ velocity }}
  </button>
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

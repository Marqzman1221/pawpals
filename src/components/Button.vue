<template>
  <button
    class="rounded-full font-bold transition duration-200 ease-in-out"
    :class="classes"
  >
    <slot></slot>
  </button>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'pink',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classes = computed(() => {
      let classString = ''

      if (props.outlined)
        classString += ` text-${props.color}-600 hover:text-${props.color}-800 active:text-${props.color}-400 border-2 border-${props.color}-600 hover:border-${props.color}-800 active:border-${props.color}-400`
      else
        classString += ` text-white bg-${props.color}-600 hover:bg-${props.color}-800 active:bg-${props.color}-400`

      if (props.icon) classString += ` p-2`
      else classString += ` px-6 py-2`

      if (props.block) classString += ` w-full`

      return classString
    })

    return {
      classes,
    }
  },
})
</script>

<style></style>

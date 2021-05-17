<template>
  <button
    class="
      outline-none
      rounded-full
      font-bold
      transition
      duration-200
      ease-in-out
    "
    :class="classes"
    :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const backgroundColor = computed(() => {
      if (props.icon) {
        return {
          hover: `gray-200`,
          base: 'transparent',
          active: 'gray-400',
        }
      }

      if (props.flat || props.outlined) {
        return {
          hover: 'transparent',
          base: 'transparent',
          active: 'transparent',
        }
      }

      return {
        hover: `${props.color}-400`,
        base: `${props.color}-600`,
        active: `${props.color}-800`,
      }
    })

    const classes = computed(() => {
      let classString = `bg-${backgroundColor.value['base']} hover:bg-${backgroundColor.value['hover']} active:bg-${backgroundColor.value['active']} focus:outline-none active:outline-none`

      if (props.outlined)
        classString += ` text-${props.color}-600 hover:text-${props.color}-800 active:text-${props.color}-400 border-2 border-${props.color}-600 hover:border-${props.color}-800 active:border-${props.color}-400`
      else if (!props.icon) classString += ` text-white`

      if (props.icon) classString += ` text-${props.color}-600 p-2`
      else classString += ` px-6 py-2`

      if (props.block) classString += ` w-full`

      if (props.disabled)
        classString += ' disabled:opacity-50 cursor-not-allowed'

      return classString
    })

    return {
      classes,
    }
  },
})
</script>

<style></style>

<template>
  <svg-icon type="mdi" :path="svgPath" :size="iconSize"></svg-icon>
</template>

<script>
import { computed, defineComponent } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'

export default defineComponent({
  props: {
    path: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => {
        return ['sm', 'md', 'lg', 'xl'].indexOf(value) !== -1
      },
    },
  },
  components: { SvgIcon },
  setup(props) {
    const svgPath = computed(() => {
      return props.path
    })

    const iconSize = computed(() => {
      switch (props.size) {
        case 'sm':
          return 12
        case 'lg':
          return 36
        case 'xl':
          return 48
        default:
          return 24
      }
    })

    return {
      svgPath,
      iconSize,
    }
  },
})
</script>

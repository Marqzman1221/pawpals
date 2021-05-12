<template>
  <div class="relative flex flex-1 pt-2 w-full flex-col items-center">
    <div class="w-full">
      <label class="flex py-2 text-left text-pink-600 text-medium">
        {{ label }}
      </label>
      <input
        class="
          transition
          duration-200
          ease-in-out
          w-full
          rounded
          bg-gray-200
          px-4
          py-2
          z-10
          focus:border-pink-600
          hover:border-pink-400
          border-2
          z-10
        "
        type="text"
        autocomplete="off"
        v-model="searchInput"
        @focus="modal = true"
        @blur="modal = false"
        @input="selected = false"
      />
    </div>

    <div
      v-show="filteredItems && modal"
      class="
        absolute
        top-24
        w-full
        rounded
        shadow-lg
        overflow-y-auto
        max-h-48
        z-20
      "
    >
      <ul class="bg-white divide-y divide-gray-200 text-gray-800">
        <li
          v-for="item in filteredItems"
          class="
            transition
            duration-200
            ease-in-out
            hover:bg-pink-600
            hover:text-white
          "
          :class="
            searchInput === item || searchInput === item[itemText]
              ? 'bg-pink-600 text-white'
              : ''
          "
          :key="item"
          @mousedown="selectItem(item)"
        >
          <div v-if="filter" class="px-4 py-2">
            {{ itemText ? item[itemText] : item }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: undefined,
    },
    itemValue: {
      type: String,
      default: undefined,
    },
    filter: {
      type: Function,
      default: () => true,
    },
    defaultValue: {
      type: String || Object,
      default: '',
    },
  },
  setup(props, { emit }) {
    const modal = ref(false)
    const searchInput = ref(props.defaultValue)
    const selected = ref(false)

    if (props.defaultValue) emit('update:modelValue', props.defaultValue)

    const allItems = reactive(props.items)

    function getPropertyFromItem(item, property) {
      if (property == null) return item

      if (item !== Object(item)) return item

      return item[property]
    }

    const filteredItems = computed(() => {
      return allItems.filter((item) => {
        if (selected.value) return true

        return props.filter(item, searchInput.value, props.itemText)
      })
    })

    function selectItem(item) {
      console.log('Click!')
      searchInput.value = getPropertyFromItem(item, props.itemValue)
      selected.value = true
      emit('update:modelValue', searchInput.value)
    }

    return {
      searchInput,
      modal,
      selected,
      allItems,
      selectItem,
      filteredItems,
    }
  },
})
</script>

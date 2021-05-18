<template>
  <div class="relative flex flex-1 pt-2 w-full flex-col items-center">
    <div class="w-full">
      <label class="flex py-2 text-left text-pink-600 text-medium">
        {{ label }}
      </label>
      <div
        class="
          flex
          transition
          duration-200
          ease-in-out
          w-full
          h-12
          rounded
          bg-gray-200
          pl-4
          z-10
          hover:border-pink-400
          border-2
          z-10
          group
        "
        :class="modal ? 'border-pink-600' : ''"
      >
        <!-- <div class="flex flex-auto flex-wrap"></div> -->
        <input
          class="
            bg-transparent
            apprearance-none
            outline-none
            w-full
            group-focus:border-pink-600
          "
          type="text"
          autocomplete="off"
          v-model="searchInput"
          @input="selected = false"
          @focus="modal = true"
          @blur="modal = false"
        />
        <div class="flex items-center w-12">
          <Button
            v-show="selected"
            class="outline-none"
            icon
            color="pink"
            @click.prevent="clearSelection()"
            :disabled="!selected"
            flat
          >
            <icon :path="mdiClose" />
          </Button>
        </div>
      </div>
    </div>

    <div
      v-show="filteredItems && modal"
      class="
        my-1
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
            (searchInput === item || searchInput === item[itemText]) && selected
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
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import Button from '../ui/Button.vue'
import Icon from '../ui/Icon.vue'
import { mdiClose } from '@mdi/js'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
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
    searchFunction: {
      type: Function,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: String || Object,
      default: '',
    },
  },
  components: {
    Button,
    Icon,
  },
  setup(props, { emit }) {
    const modal = ref(false)
    const searchInput = ref('')
    const selected = ref(false)

    onMounted(() => {
      if (props.modelValue) {
        searchInput.value = props.modelValue
        selected.value = true
      }
    })

    function getPropertyFromItem(item, property) {
      if (property == null) return item

      if (item !== Object(item)) return item

      return item[property]
    }

    const filteredItems = computed(() => {
      return props.items.filter((item) => {
        if (selected.value) return true

        return props.filter(item, searchInput.value, props.itemText)
      })
    })

    function selectItem(item) {
      selected.value = true
      searchInput.value = getPropertyFromItem(item, props.itemValue)
      emit('update:modelValue', searchInput.value)
      modal.value = false
    }

    function clearSelection() {
      searchInput.value = ''
      selected.value = false
      emit('update:modelValue', searchInput.value)
    }

    if (props.searchFunction) {
      watch(searchInput, () => {
        if (props.loading || selected.value) return
        else props.searchFunction(searchInput.value)
      })
    }

    return {
      mdiClose,
      searchInput,
      modal,
      selected,
      selectItem,
      filteredItems,
      clearSelection,
    }
  },
})
</script>

<template>
  <select v-bind="$attrs" v-on="listeners" class="simple-select" @keydown="handleKeydown">
    <option v-for="option in options" :key="formatValue(option)" :value="formatValue(option)">
      <slot name="option" :option="option">
        {{ formatLabel(option) }}
      </slot>
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => [] },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: () => {},
        change: event => { this.$emit('input', event.target.value) },
      }
    },
  },
  methods: {
    formatValue(option) {
      if (typeof option === 'string') return option
      else return option?.value || option?.label
    },
    formatLabel(option) {
      if (typeof option === 'string') return option
      else return option?.label || option?.value
    },
    handleKeydown({ code }) {
      if (code === 'Delete') this.$emit('input', null)
    },
  },
}
</script>

<docs>
# SimpleSelect component

This is a very basic component that uses the `HTMLSelectElement` directly.

## Behavior

One of the things that is very much missing from the original component is the capability to deselect
the currently selected option. To mitigate that, if the user presses `Delete` key the component will
set the value to `null`.

## API

This section describes the props that are unique to this component.
All other attributes that provided by `HTMLSelectElement` can also be used,
but are not directly specified here

### Props

#### `options`

This is a list of options allowed to be selected. The list can either be a list of strings
or a list of objects containing the following fields:
- `label` - label to be displayed
- `value` - value of the option

### Slots

#### `option`

The `option` slot allows for custom rendering of labels of options. Essentially this allows
the developer to do trings like translations, customization or any other custom rendering
of the content.

Have fun!
</docs>

<template>
  <div>
    <p>Selected value: <strong>{{ selected | none }}</strong></p>
    <div>
      <p>Simple select (default)</p>
      <SimpleSelect v-model="selected" :options="options" />
    </div>
    <div>
      <p>Simple select with custom option rendering</p>
      <SimpleSelect v-model="selected" :options="options">
        <template #option="{ option }">
          Click to select {{ option.label }}
        </template>
      </SimpleSelect>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SimpleSelect } from 'dropdown'

export default Vue.extend({
  components: {
    SimpleSelect,
  },
  filters: {
    none(value) {
      return value || '(none)'
    },
  },
  data() {
    return {
      selected: '',
      options: [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second', extra: true },
        { value: 3, label: 'Third' },
      ],
    }
  },
})
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import SimpleSelect from './SimpleSelect.vue'

/**
 * A simple wrapper class to encapsulate the structure
 * and operations on a SimpleSelect component
 */
class SimpleSelectWrapper {
  constructor({ options } = {}) {
    this.wrapper = mount(SimpleSelect, { propsData: { options } })
  }

  destroy() {
    this.wrapper?.destroy()
  }

  /**
   * List of available options
   */
  get options() {
    return this.wrapper.findAll('select > option')
  }

  /**
   * @param {number} index option index
   * @param {string} value expected option value
   * @param {string} label expected option label
   */
  assertOption(index, value, label) {
    expect(this.options.length).toBeGreaterThan(index)
    expect(this.options.at(index).attributes('value')).toBe(value)
    expect(this.options.at(index).text()).toBe(label)
  }

  /**
   * @param {Array} options options to search for index of value
   * @param {String} value to look for in options
   */
  #getIndexOfValue(options, value) {
    for (let i = 0; i < options.length; i++) {
      if (options.at(i).attributes('value') === value) return i
    }

    return null
  }

  /**
   * @param {Number | String} indexOrValue index or value of option to select
   */
  async select(indexOrValue) {
    const index = typeof indexOrValue === 'number'
      ? indexOrValue
      : this.#getIndexOfValue(this.options, indexOrValue)

    expect(index).toBeLessThan(this.options.length)
    const option = this.options.at(index)

    await option.trigger('change')

    expect(this.wrapper.emitted('input').length).toBe(1)
    expect(this.wrapper.emitted('input').at(-1)).toStrictEqual([ option.attributes('value') ])

    return option
  }

  async clear() {
    await this.wrapper.trigger('keydown', { code: 'Delete' })
    expect(this.wrapper.emitted('input').at(-1)).toStrictEqual([ null ])
  }
}

describe('Example component', () => {
  it('will render without options', () => {
    const wrapper = new SimpleSelectWrapper()
    expect(wrapper.options.length).toBe(0)
    wrapper.destroy()
  })

  it('will render with single string option', () => {
    const wrapper = new SimpleSelectWrapper({ options: [ 'x' ] })
    wrapper.assertOption(0, 'x', 'x')
    wrapper.destroy()
  })

  it('will render with single object option', () => {
    const wrapper = new SimpleSelectWrapper({ options: [ { value: 1, label: 'y' } ] })
    wrapper.assertOption(0, '1', 'y')
    wrapper.destroy()
  })

  it('will render with single object option with missing label', () => {
    const wrapper = new SimpleSelectWrapper({ options: [ { value: 1 } ] })
    wrapper.assertOption(0, '1', '1')
    wrapper.destroy()
  })

  it('will render with single object option with missing value', () => {
    const wrapper = new SimpleSelectWrapper({ options: [ { label: 2 } ] })
    wrapper.assertOption(0, '2', '2')
    wrapper.destroy()
  })

  it('will allow selecting string options given option index', async () => {
    const wrapper = new SimpleSelectWrapper({ options: [ 'x1', 'y1', 'z1' ] })
    const option = await wrapper.select(2)
    expect(option.attributes('value')).toBe('z1')
  })

  it('will allow selecting string options given string value', async () => {
    const wrapper = new SimpleSelectWrapper({ options: [ 'x1', 'y1', 'z1' ] })
    const option = await wrapper.select('y1')
    expect(option.attributes('value')).toBe('y1')
  })

  it('will allow selecting object options given option index', async () => {
    const wrapper = new SimpleSelectWrapper({ options: [
      { value: '1', label: 'x1' },
      { value: '2', label: 'y1' },
      { value: '3', label: 'z1' },
    ] })
    const option = await wrapper.select(2)
    expect(option.attributes('value')).toBe('3')
  })

  it('will allow selecting string options given string value', async () => {
    const wrapper = new SimpleSelectWrapper({ options: [
      { value: 'a', label: 'x1' },
      { value: 'b', label: 'y1' },
      { value: 'c', label: 'z1' },
    ] })
    const option = await wrapper.select('b')
    expect(option.attributes('value')).toBe('b')
    expect(option.text()).toBe('y1')
  })

  it('will clear the value when pressing Delete key', async () => {
    const wrapper = new SimpleSelectWrapper({ options: [ 'x1' ] })
    await wrapper.select('x1')
    await wrapper.clear()
    wrapper.destroy()
  })
})

import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((nav, baseShortcuts) => {
  return [
    ...baseShortcuts,
    {
      key: 'w',
      fn: () => {
        const event = new CustomEvent('toggle-niconico-comments')
        window.dispatchEvent(event)
      },
      autoRepeat: false
    },
    {
      key: 'c',
      fn: () => {
        const event = new CustomEvent('add-manual-comment')
        window.dispatchEvent(event)
      },
      autoRepeat: false
    }
  ]
})
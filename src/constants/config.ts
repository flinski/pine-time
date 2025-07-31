export type SettingsType = {
  focusTime: number
  breakTime: number
  restTime: number
  sessionsCycle: number
}

export const defaultSettings: SettingsType = {
  focusTime: 25 * 60,
  breakTime: 5 * 60,
  restTime: 15 * 60,
  sessionsCycle: 4,
}

export const LS_KEY = 'flinski-pine-time'

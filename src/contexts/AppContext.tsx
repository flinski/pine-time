import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'
import { defaultSettings, LS_KEY, type SettingsType } from '@/constants/config'

type StateType = {
  timeLeft: number
  focusTime: number
  breakTime: number
  restTime: number
  sessions: number
  sessionsCycle: number
  isActive: boolean
  isCompleted: boolean
  areSettingsOpen: boolean
  mode: 'focus' | 'break' | 'rest'
}

type ActionType =
  | { type: 'timer/toggle' }
  | { type: 'timer/complete' }
  | { type: 'timer/decrease' }
  | { type: 'timer/reset' }
  | { type: 'settings/open' }
  | { type: 'settings/close' }
  | {
      type: 'settings/changeModeTime'
      payload: {
        value: number
        mode: 'focus' | 'break' | 'rest'
      }
    }
  | { type: 'settings/setSessionsCycle'; payload: number }

const AppContext = createContext<StateType | null>(null)
const AppDispatchContext = createContext<Dispatch<ActionType> | null>(null)

export function useAppState() {
  const state = useContext(AppContext)

  if (state === null) {
    throw new Error('useAppState must be used within AppProvider')
  }

  return state
}

export function useAppDispatch() {
  const dispatch = useContext(AppDispatchContext)

  if (dispatch === null) {
    throw new Error('useAppState must be used within AppProvider')
  }

  return dispatch
}

const settings: SettingsType = JSON.parse(
  localStorage.getItem(LS_KEY) ?? JSON.stringify(defaultSettings)
)

const initialState: StateType = {
  timeLeft: settings.focusTime,
  focusTime: settings.focusTime,
  breakTime: settings.breakTime,
  restTime: settings.restTime,
  sessions: 1,
  sessionsCycle: settings.sessionsCycle,
  isActive: false,
  isCompleted: false,
  areSettingsOpen: false,
  mode: 'focus',
}

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'timer/toggle': {
      return {
        ...state,
        isActive: !state.isActive,
        isCompleted: false,
      }
    }
    case 'timer/complete': {
      let newMode: 'focus' | 'break' | 'rest'
      let newTimeLeft
      const newSessions = state.sessions + 1 > state.sessionsCycle ? 1 : state.sessions + 1

      if (state.mode === 'focus') {
        if (newSessions % state.sessionsCycle === 0) {
          newMode = 'rest'
          newTimeLeft = state.restTime
        } else {
          newMode = 'break'
          newTimeLeft = state.breakTime
        }
      } else {
        newMode = 'focus'
        newTimeLeft = state.focusTime
      }

      return {
        ...state,
        isActive: false,
        isCompleted: true,
        mode: newMode,
        timeLeft: newTimeLeft,
        sessions: newSessions,
      }
    }
    case 'timer/decrease': {
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      }
    }
    case 'timer/reset': {
      return {
        ...state,
        timeLeft:
          state.mode === 'focus'
            ? state.focusTime
            : state.mode === 'break'
              ? state.breakTime
              : state.restTime,
        isActive: false,
        isCompleted: false,
      }
    }
    case 'settings/open': {
      return {
        ...state,
        areSettingsOpen: true,
      }
    }
    case 'settings/close': {
      return {
        ...state,
        areSettingsOpen: false,
      }
    }
    case 'settings/changeModeTime': {
      let mode

      switch (action.payload.mode) {
        case 'focus': {
          mode = 'focusTime'
          break
        }
        case 'break': {
          mode = 'breakTime'
          break
        }
        case 'rest': {
          mode = 'restTime'
          break
        }
      }

      return {
        ...state,
        [mode]: action.payload.value,
      }
    }
    case 'settings/setSessionsCycle': {
      return {
        ...state,
        sessionsCycle: action.payload,
      }
    }
    default: {
      throw new Error('Unknown action type')
    }
  }
}

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

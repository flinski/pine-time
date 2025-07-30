import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'

type StateType = {
  timeLeft: number
  focusTime: number
  breakTime: number
  restTime: number
  sessions: number
  isActive: boolean
  isCompleted: boolean
  mode: 'focus' | 'break' | 'rest'
}

type ActionType = { type: 'timer/toggle' } | { type: 'timer/decrease' }

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

const initialState: StateType = {
  timeLeft: 1 * 60,
  focusTime: 1 * 60,
  breakTime: 5 * 60,
  restTime: 15 * 60,
  sessions: 0,
  isActive: false,
  isCompleted: false,
  mode: 'focus',
}

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'timer/toggle': {
      return {
        ...state,
        isCompleted: false,
        isActive: !state.isActive,
      }
    }
    case 'timer/decrease': {
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
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

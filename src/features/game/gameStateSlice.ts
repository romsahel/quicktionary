import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"

export type GameOptions = {
  millisecondsBetweenSeconds: number
  secondsBetweenWords: number
}

export interface GameState {
  status: "idle" | "playing" | "debriefing" | "finished"
  currentWordIndex: number
  words: string[]
  playOptions: GameOptions
  debriefingOptions: GameOptions
}

const initialState: GameState = {
  status: "idle",
  currentWordIndex: 0,
  words: [],
  playOptions: {
    millisecondsBetweenSeconds: 1000,
    secondsBetweenWords: 3,
  },
  debriefingOptions: {
    millisecondsBetweenSeconds: 1000,
    secondsBetweenWords: 5,
  },
}

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    start: (state, action: PayloadAction<string[]>) => {
      state.status = "playing"
      state.words = action.payload
      state.currentWordIndex = 0
    },
    goToNextWord: (state) => {
      state.currentWordIndex++
      if (state.currentWordIndex === state.words.length) {
        state.status = "debriefing"
      }
    },
    finish: (state) => {
      state.status = "idle"
    },
    setPlayOptions: (state, action: PayloadAction<GameOptions>) => {
      state.playOptions = action.payload
    },
    setDebriefingOptions: (state, action: PayloadAction<GameOptions>) => {
      state.debriefingOptions = action.payload
    },
  },
})

export const {
  start,
  goToNextWord,
  finish,
  setPlayOptions,
  setDebriefingOptions,
} = gameStateSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.gameState.value)`
export const selectStatus = (state: RootState) => state.gameState.status
export const selectWords = (state: RootState) => state.gameState.words
export const selectCurrentWord = (state: RootState) => {
  return state.gameState.currentWordIndex < state.gameState.words.length
    ? state.gameState.words[state.gameState.currentWordIndex]
    : ""
}
export const selectPlayOptions = (state: RootState) =>
  state.gameState.playOptions
export const selectDebriefingOptions = (state: RootState) =>
  state.gameState.debriefingOptions

import objectsPerCategory from "./assets/object-list.json"

function choseRandomWords(count: number) {
  const randomWords = new Array(count)
  const allWords = Object.values(objectsPerCategory).flat()
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allWords.length)
    randomWords[i] = allWords[randomIndex]
    allWords.splice(randomIndex, 1)
  }
  return randomWords
}

export const startAndInitialize =
  (count: number): AppThunk =>
  (dispatch) => {
    const words = choseRandomWords(count)
    dispatch(start(words))
  }

export default gameStateSlice.reducer

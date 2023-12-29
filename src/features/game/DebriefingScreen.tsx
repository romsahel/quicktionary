import style from "../counter/Counter.module.css"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import { finish, selectDebriefingOptions, selectWords } from "./gameStateSlice"
import { Seconds } from "../counter/Seconds"
import { Word } from "./Word"

function shuffle<T>(array: Array<T>) {
  let remainingLength = array.length
  while (remainingLength) {
    const i = Math.floor(Math.random() * remainingLength)
    remainingLength--

    const t = array[remainingLength]
    array[remainingLength] = array[i]
    array[i] = t
  }

  return array
}

function computeIndices(wordsCount: number) {
  const indices: number[] = []
  for (let i = 0; i < wordsCount; i++) {
    indices.push(i)
  }

  console.log(indices)

  shuffle(indices)

  console.log(indices)
  return indices
}

enum State {
  Asking,
  Waiting,
}

export function DebriefingScreen() {
  const words = useAppSelector(selectWords)
  const options = useAppSelector(selectDebriefingOptions)

  const [indices] = useState(computeIndices(words.length))
  const [current, setCurrent] = useState(0)
  const [state, setState] = useState(State.Asking)

  const dispatch = useAppDispatch()
  function showAnswer() {
    setState(State.Waiting)
  }

  function askNextWord() {
    if (current === indices.length - 1) {
      dispatch(finish())
      return
    }
    setState(State.Asking)
    setCurrent((previous) => {
      return previous + 1
    })
  }

  return (
    <>
      {state === State.Asking ? (
        <>
          <Word word={`Mot n°${indices[current] + 1}`} />
          <Seconds
            startValue={options.secondsBetweenWords}
            delayBetweenSeconds={options.millisecondsBetweenSeconds}
            counterReachedZero={showAnswer}
          />
        </>
      ) : (
        <>
          <Word
            word={[words[indices[current]], `Mot n°${indices[current] + 1}`]}
          />
          <button className={style.button} onClick={askNextWord}>
            Next
          </button>
        </>
      )}
    </>
  )
}

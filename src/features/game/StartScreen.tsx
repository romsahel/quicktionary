import styles from "../counter/Counter.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import {
  selectPlayOptions,
  setPlayOptions,
  startAndInitialize,
} from "./gameStateSlice"
import { useEffect } from "react"

export function StartScreen() {
  const dispatch = useAppDispatch()
  const playOptions = useAppSelector(selectPlayOptions)

  const online = true

  // const {
  //   value: online,
  //   setFalse: setOffline,
  //   setTrue: setOnline,
  // } = useBooleanState(navigator.onLine)
  // const previousOnline = usePrevious(online)
  // useEffect(() => {
  //   window.addEventListener("online", setOnline)
  //   window.addEventListener("offline", setOffline)

  //   return () => {
  //     window.removeEventListener("online", setOnline)
  //     window.removeEventListener("offline", setOffline)
  //   }
  // }, [])

  const changeSecondsBetweenWords = function (offset: number) {
    dispatch(
      setPlayOptions({
        ...playOptions,
        secondsBetweenWords: playOptions.secondsBetweenWords + offset,
      }),
    )
  }

  return (
    <>
      {online ? <></> : <p>Working offline</p>}
      <div className={styles.row}>
        <p>Seconds between words</p>
        <span className={styles.value}>{playOptions.secondsBetweenWords}</span>
        <button
          className={styles.button}
          onClick={() => changeSecondsBetweenWords(-1)}
        >
          -
        </button>
        <button
          className={styles.button}
          onClick={() => changeSecondsBetweenWords(+1)}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => dispatch(startAndInitialize(20))}
        >
          Start
        </button>
      </div>
    </>
  )
}
function useBooleanState(onLine: boolean): {
  value: any
  setFalse: any
  setTrue: any
} {
  throw new Error("Function not implemented.")
}

function usePrevious(online: any) {
  throw new Error("Function not implemented.")
}

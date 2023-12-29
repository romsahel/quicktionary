import styles from "../counter/Counter.module.css"
import { useEffect, useState } from "react"

export type SecondsProps = {
  delayBetweenSeconds: number
  startValue: number
  counterReachedZero: () => void
}

export function Seconds(props: SecondsProps) {
  const [current, setCurrent] = useState(props.startValue)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (current === 0) {
        setCurrent(props.startValue)
        props.counterReachedZero()
      } else {
        setCurrent(current - 1)
      }
    }, props.delayBetweenSeconds)

    return () => {
      return clearTimeout(timeoutId)
    }
  }, [current])

  return (
    <div>
      <span className={styles.value}>{current}</span>
    </div>
  )
}

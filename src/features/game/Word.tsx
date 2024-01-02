import CSS from "csstype"
import { useAppSelector } from "../../app/hooks"
import { selectCurrentWord } from "./gameStateSlice"

const wordContainerStyle: CSS.Properties = {
  position: "absolute",
  width: "100%",
  height: "auto",
}

export const wordContainerStyles: CSS.Properties[] = [
  { ...wordContainerStyle, top: 0, transform: "scale(-1, -1)" },
  { ...wordContainerStyle, bottom: 0 },
]

export type WordProps = {
  word: string | string[]
}

export function Word(props: WordProps) {
  const words = typeof props.word === "string" ? [props.word] : props.word
  const x = words.map((word) => {
    return (
      <span key={word}>
        {word}
        <br />
      </span>
    )
  })
  const wordElements = wordContainerStyles.map(
    (style: CSS.Properties, index: number) => (
      <div style={style} key={index}>
        <h1>{x}</h1>
      </div>
    ),
  )
  return <>{wordElements}</>
}

import { useAppDispatch, useAppSelector } from "../../app/hooks"

import {
  goToNextWord,
  selectCurrentWord,
  selectPlayOptions,
} from "./gameStateSlice"
import { Seconds } from "../counter/Seconds"
import { Word } from "./Word"
import { textToSpeech } from "./TextToSpeech"

export function PlayScreen() {
  const dispatch = useAppDispatch()
  const currentWord = useAppSelector(selectCurrentWord)
  const options = useAppSelector(selectPlayOptions)

  textToSpeech.say(currentWord)

  return (
    <>
      <Word word={currentWord} />
      <Seconds
        startValue={options.secondsBetweenWords}
        delayBetweenSeconds={options.millisecondsBetweenSeconds}
        counterReachedZero={() => dispatch(goToNextWord())}
      />
    </>
  )
}

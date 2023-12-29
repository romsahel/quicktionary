import "./App.css"
import { useAppSelector } from "./app/hooks"

import { selectStatus } from "./features/game/gameStateSlice"

import { StartScreen } from "./features/game/StartScreen"
import { PlayScreen } from "./features/game/PlayScreen"
import { DebriefingScreen } from "./features/game/DebriefingScreen"

function App() {
  const status = useAppSelector(selectStatus)

  const getScreen = function () {
    switch (status) {
      case "idle":
        return <StartScreen />
      case "playing":
        return <PlayScreen />
      case "debriefing":
        return <DebriefingScreen />
      case "finished":
        return <StartScreen />
    }
  }

  return (
    <div className="App">
      <header className="App-header">{getScreen()}</header>
    </div>
  )
}

export default App

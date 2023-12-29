import React, { Profiler } from "react"
import ReactDOM from "react-dom/client"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { Interaction } from "scheduler/tracing"

const onRender = function (
  id: string,
  phase: "mount" | "update" | "nested-update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Set<Interaction>,
): void {}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Profiler id="App" onRender={onRender}>
        <App />
      </Profiler>
    </Provider>
  </React.StrictMode>,
)

serviceWorkerRegistration.register()

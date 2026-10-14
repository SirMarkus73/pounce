import { hasAria2 } from "@pounce-dl/core"
import { connect, disconnect } from "@pounce-dl/core/connection"
import { render } from "ink"
import { App } from "./src/app"

const [has, version] = await hasAria2()

async function bootstrap() {
  if (!has) {
    console.error("Por favor descarga aria2")
    return
  }

  try {
    await connect()
  } catch {
    console.error("No se ha podido conectar con aria2")
    return
  }

  const { waitUntilExit } = render(<App aria2Version={version} />)

  try {
    await waitUntilExit()
  } finally {
    await disconnect()
  }
}

void bootstrap()

import { addUriToQueue } from "@pounce-dl/core"
import { Box, Spacer, Text } from "ink"
import { useState } from "react"
import { Downloads } from "./components/downloads"
import { Button } from "./ui/components/button"
import { Input } from "./ui/components/Input"

type AppProps = {
  aria2Version: string
}

export const App: React.FC<AppProps> = ({ aria2Version }) => {
  const [url, setUrl] = useState("")

  return (
    <Box flexDirection="column">
      <Box flexDirection="column">
        <Text>Pounce ({aria2Version})</Text>
        <Input value={url} onValueChange={setUrl} autoFocus />
        <Button
          onClick={() => {
            const uri = url.trim()

            addUriToQueue(uri)
          }}
        >
          Descargar
        </Button>
      </Box>
      <Spacer />
      <Downloads />
    </Box>
  )
}

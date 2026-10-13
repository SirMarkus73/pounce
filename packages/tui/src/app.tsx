import { addUriToQueue } from "@pounce/core"
import { Box, Spacer, Text } from "ink"
import { useState } from "react"
import { Downloads } from "./components/downloads"
import { Button } from "./ui/components/button"
import { Input } from "./ui/components/Input"

type TestProps = {
  aria2Version: string
}

export const App = ({ aria2Version }: TestProps) => {
  const [url, setUrl] = useState("")

  return (
    <Box flexDirection="column">
      <Box flexDirection="column">
        <Text>Bounce.cat ({aria2Version})</Text>
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

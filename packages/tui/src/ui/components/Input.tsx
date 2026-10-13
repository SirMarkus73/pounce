import { Box, Text, useFocus, useInput } from "ink"
import type React from "react"
import { useRef, useState } from "react"

type InputProps = {
  autoFocus?: boolean
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<string>>
}

export const Input = ({ autoFocus, onValueChange, value }: InputProps) => {
  const [input, setInput] = useState("gola")
  const { isFocused } = useFocus({ autoFocus })

  useInput((input, key) => {
    if (!isFocused) return

    if (key.backspace) {
      onValueChange((prev) => prev.slice(0, prev.length - 1))
      return
    }

    onValueChange((prev) => prev + input)
  })

  return (
    <Box>
      <Text color={isFocused ? "whiteBright" : "grey"}>URL descarga:</Text>
      <Text> {value}</Text>
    </Box>
  )
}

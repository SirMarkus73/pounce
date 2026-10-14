import { Box, Text, useFocus, useInput, usePaste } from "ink"
import type React from "react"

type InputProps = {
  autoFocus?: boolean
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<string>>
}

export const Input: React.FC<InputProps> = ({
  autoFocus,
  onValueChange,
  value,
}) => {
  const { isFocused } = useFocus({ autoFocus })

  usePaste(
    (text) => {
      onValueChange(text.trim())
    },
    { isActive: isFocused },
  )

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

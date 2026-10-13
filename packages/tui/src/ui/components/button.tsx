import { Box, Text, useFocus, useInput } from "ink"
import type React from "react"

type ButtonProps = {
  children?: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  const { isFocused } = useFocus()

  useInput((input, key) => {
    if (key.return || input === " ") onClick?.()
  })

  return <Text backgroundColor={isFocused ? "green" : "gray"}>{children}</Text>
}

import { Box, Text, useFocus, useInput } from "ink"
import type React from "react"
import type { FC } from "react"

type ButtonProps = {
  children?: React.ReactNode
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  const { isFocused } = useFocus()

  useInput((input, key) => {
    if (key.return || input === " ") onClick?.()
  })

  return (
    <Box aria-role="button" backgroundColor={isFocused ? "green" : "gray"}>
      <Text>{children}</Text>
    </Box>
  )
}

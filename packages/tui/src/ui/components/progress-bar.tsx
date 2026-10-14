import { Text } from "ink"

type ProgressBarProps = {
  /** Progreso entre 0 y 1 */
  value: number
  width?: number
  color?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  width = 30,
  color = "green",
}) => {
  const ratio = Math.min(1, Math.max(0, value))
  const filled = Math.round(ratio * width)

  return (
    <Text>
      <Text color={color}>{"█".repeat(filled)}</Text>
      <Text color="gray">{"░".repeat(width - filled)}</Text>
    </Text>
  )
}

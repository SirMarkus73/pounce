import { STATUS } from "@pounce-dl/core/constants"
import type { Download as DownloadData } from "@pounce-dl/core/types"
import { Box, Spacer, Text } from "ink"
import { ProgressBar } from "../ui/components/progress-bar"

const STATUS_STYLES: Record<
  STATUS,
  { icon: string; label: string; color: string }
> = {
  [STATUS.ACTIVE]: { icon: "↓", label: "Descargando", color: "green" },
  [STATUS.WAITING]: { icon: "…", label: "En cola", color: "yellow" },
  [STATUS.PAUSED]: { icon: "‖", label: "Pausada", color: "gray" },
  [STATUS.ERROR]: { icon: "✗", label: "Error", color: "red" },
  [STATUS.COMPLETED]: { icon: "✓", label: "Completada", color: "cyan" },
  [STATUS.REMOVED]: { icon: "−", label: "Eliminada", color: "gray" },
}

const UNITS = ["B", "KB", "MB", "GB", "TB"]

const formatBytes = (bytes: number) => {
  let value = bytes
  let unit = 0

  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024
    unit++
  }

  return `${value.toFixed(unit === 0 ? 0 : 1)} ${UNITS[unit]}`
}

const getFileName = (path: string) => path.split("/").pop() || "Resolviendo…"

type DownloadProps = {
  download: DownloadData
}

export const Download = ({ download }: DownloadProps) => {
  const { icon, label, color } = STATUS_STYLES[download.status]

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={color}
      paddingX={1}
    >
      <Box>
        <Text color={color} bold>
          {icon} {label}
        </Text>
        <Spacer />
        {download.status === STATUS.ACTIVE && (
          <Text color={color}>
            {formatBytes(Number(download.speedInBytes))}/s
          </Text>
        )}
      </Box>

      {download.files.map((f) => {
        const progress = f.length > 0 ? f.completedLength / f.length : 0

        return (
          <Box key={f.index} flexDirection="column" marginTop={1}>
            <Text bold wrap="truncate-middle">
              {getFileName(f.path)}
            </Text>
            <Box gap={1}>
              <ProgressBar value={progress} color={color} />
              <Text>{Math.floor(progress * 100)}%</Text>
              <Text dimColor>
                {formatBytes(f.completedLength)} / {formatBytes(f.length)}
              </Text>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

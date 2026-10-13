import {
  getDownloads,
  refreshDownloads,
  suscribeToDownloads,
} from "@pounce/core"
import { Box, Text } from "ink"
import { useEffect, useSyncExternalStore } from "react"

export const Downloads = () => {
  const downloads = useSyncExternalStore(suscribeToDownloads, getDownloads)

  const hasDownloads = downloads.length > 0

  useEffect(() => {
    if (hasDownloads) {
      const interval = setInterval(() => {
        refreshDownloads()
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [hasDownloads])

  return (
    <Box flexDirection="column">
      {downloads.map((download) => (
        <Box key={download.gid} flexDirection="column">
          {download.files.map((f) => (
            <Text key={f.index}>
              {f.path} {f.completedLength} / {f.length}
            </Text>
          ))}
        </Box>
      ))}
    </Box>
  )
}

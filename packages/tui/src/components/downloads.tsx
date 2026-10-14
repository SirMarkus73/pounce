import {
  getDownloads,
  refreshDownloads,
  subscribeToDownloads,
} from "@pounce-dl/core"
import { Box } from "ink"
import { useEffect, useSyncExternalStore } from "react"
import { Download } from "./download"

export const Downloads = () => {
  const downloads = useSyncExternalStore(subscribeToDownloads, getDownloads)

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
        <Download key={download.gid} download={download} />
      ))}
    </Box>
  )
}

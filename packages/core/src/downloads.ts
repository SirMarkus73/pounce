import { type Aria2DownloadState, aria2, type Conn } from "maria2"
import { STATUS } from "./constants"
import { getConnection } from "./internal/connection"
import type { Downloads } from "./types"

const fetchDownloads = (conn: Conn) => aria2.tellActive(conn)

let downloads: Downloads = []

const listeners = new Set<() => void>()

const parseDownloadStatus = (status: Aria2DownloadState): STATUS => {
  switch (status) {
    case "active": {
      return STATUS.ACTIVE
    }
    case "complete": {
      return STATUS.COMPLETED
    }
    case "error": {
      return STATUS.ERROR
    }
    case "paused": {
      return STATUS.PAUSED
    }
    case "removed": {
      return STATUS.REMOVED
    }
    case "waiting": {
      return STATUS.WAITING
    }
  }
}

export const getDownloads = () => downloads

let refreshingDownloads = false
export const refreshDownloads = async () => {
  if (refreshingDownloads === true) return

  try {
    refreshingDownloads = true
    const conn = await getConnection()

    const fetchedDownloads = await fetchDownloads(conn)

    downloads = fetchedDownloads.map((d) => ({
      gid: d.gid,
      speedInBytes: BigInt(d.downloadSpeed),
      files: d.files.map((f) => ({
        path: f.path,
        index: f.index,
        length: +f.length,
        completedLength: +f.completedLength,
      })),
      status: parseDownloadStatus(d.status),
    }))

    for (const listener of listeners) {
      listener()
    }
  } finally {
    refreshingDownloads = false
  }
}

const setupDownloadListeners = async () => {
  const conn = await getConnection()

  aria2.onDownloadStart(conn, refreshDownloads)
  aria2.onDownloadComplete(conn, refreshDownloads)

  aria2.onDownloadStop(conn, refreshDownloads)
  aria2.onDownloadPause(conn, refreshDownloads)

  aria2.onDownloadError(conn, refreshDownloads)
}

export const subscribeToDownloads = (callback: () => void) => {
  setupDownloadListeners()

  listeners.add(callback)

  return () => {
    listeners.delete(callback)
  }
}

import { type Aria2DownloadState, aria2, type Conn } from "maria2"
import { getConnection } from "./src/connection"
import { STATUS } from "./src/constants"
import type { Downloads } from "./src/types/download"

export async function hasAria2() {
  try {
    const stdout = await Bun.$`aria2c --version`.text()

    const match = stdout.match(/^aria2c?\s+\S+\s+(\d+(?:\.\d+)+)/im)
    const version = match?.[1]

    if (!version) {
      throw new Error("Unable to find aria2 version")
    }

    return [true, version] as const
  } catch (e) {
    if (
      e instanceof Bun.$.ShellError &&
      e.stderr.includes("command not found")
    ) {
      return [false, undefined] as const
    }

    throw e
  }
}

export const getVersion = async () => {
  const conn = await getConnection()
  return await aria2.getVersion(conn)
}

export const addUrisToQueue = async (uris: string[]): Promise<string> => {
  const conn = await getConnection()

  return await aria2.addUri(conn, uris)
}

export const addUriToQueue = async (uri: string): Promise<string> => {
  return await addUrisToQueue([uri])
}

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

export const suscribeToDownloads = (callback: () => void) => {
  setupDownloadListeners()

  listeners.add(callback)

  return () => {
    listeners.delete(callback)
  }
}

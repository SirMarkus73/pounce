import { execFile } from "node:child_process"
import { promisify } from "node:util"
import { aria2 } from "maria2"
import { getConnection } from "./internal/connection"

const execFileAsync = promisify(execFile)

export async function hasAria2() {
  try {
    const { stdout } = await execFileAsync("aria2c", ["--version"])

    const match = stdout.match(/^aria2c?\s+\S+\s+(\d+(?:\.\d+)+)/im)
    const version = match?.[1]

    if (!version) {
      throw new Error("Unable to find aria2 version")
    }

    return [true, version] as const
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      return [false, undefined] as const
    }

    throw e
  }
}

export const getVersion = async () => {
  const conn = await getConnection()
  return await aria2.getVersion(conn)
}

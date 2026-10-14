import { aria2 } from "maria2"
import { getConnection } from "./internal/connection"

export const addUrisToQueue = async (uris: string[]): Promise<string> => {
  const conn = await getConnection()

  return await aria2.addUri(conn, uris)
}

export const addUriToQueue = async (uri: string): Promise<string> => {
  return await addUrisToQueue([uri])
}

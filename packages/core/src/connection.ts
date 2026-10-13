import { type Conn, close, createWebSocket, open } from "maria2"

const ARIA2_URL = "ws://localhost:6800/jsonrpc"

let connPromise: Promise<Conn> | undefined

export function getConnection(): Promise<Conn> {
  if (connPromise) return connPromise

  const p = open(
    createWebSocket(ARIA2_URL),
    // { secret: SECRET }
  ).then((conn) => {
    conn.socket.addEventListener("close", () => {
      if (connPromise === p) connPromise = undefined
    })
    return conn
  })

  p.catch(() => {
    if (connPromise === p) connPromise = undefined
  })

  connPromise = p
  return p
}

export async function closeConnection() {
  const p = connPromise
  connPromise = undefined

  if (p) close(await p)
}

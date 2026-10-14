import { closeConnection, getConnection } from "./internal/connection"

export async function connect() {
  await getConnection()
}

export async function disconnect() {
  await closeConnection()
}

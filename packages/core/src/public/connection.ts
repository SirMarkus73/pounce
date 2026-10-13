import { closeConnection, getConnection } from "../connection"

export async function connect() {
  await getConnection()
}

export async function disconnect() {
  await closeConnection()
}

import type { STATUS } from "../constants/status"

export type Download = {
  gid: string
  status: STATUS
  speedInBytes: bigint
  files: {
    index: number
    path: string
    length: number
    completedLength: number
  }[]
}

export type Downloads = Download[]

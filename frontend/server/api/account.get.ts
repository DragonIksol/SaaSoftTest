import { accounts } from '../db/fakeDb'

export default defineEventHandler(async () => {
  return { accounts }
})
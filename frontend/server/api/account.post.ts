import { accounts, accountsInfo } from '../db/fakeDb'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  body.id = accountsInfo.lastAccId++
  accounts.push(body)
  return { message: 'Запись успешно добавлена' }
})
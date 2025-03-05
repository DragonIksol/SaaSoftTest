import { accounts } from '../db/fakeDb'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const accIndex = accounts.findIndex(x => x.id === body.id)
  if (accIndex !== -1) {
    Object.assign(accounts[accIndex], body)
    return { message: 'Запись успешно обновлена' }
  }
  return { error: 'Запись для обновления возможно удалена' }
})
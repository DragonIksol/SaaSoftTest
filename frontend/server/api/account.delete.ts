import { accounts } from '../db/fakeDb'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const accIndex = accounts.findIndex(x => x.id === body.id)
  if (accIndex !== -1) {
    accounts.splice(accIndex, 1)
    return { message: 'Запись успешно удалена' }
  }
  return { error: 'Запись для обновления возможно удалена' }
})

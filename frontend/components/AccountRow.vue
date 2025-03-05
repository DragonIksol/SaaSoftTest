<template>
  <tr ref="tr">
    <td>
      <input
        type="text"
        :value="account.label.map((x: AccountLabelElement) => x.text).join(';')"
        @input="e => account.label = (e.target as HTMLInputElement).value.split(';').map((x: string) => { return { text: x } })"
        @blur="validateAccount()"
        @change="() => { hasChanges = true }"
        maxlength="50" />
    </td>
    <td>
      <select v-model="account.type" @change="validateAccount()" required>
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
    </td>
    <td :colspan="account.type === 'Локальная' ? 1 : 2">
      <input
        type="text"
        v-model="account.login"
        @blur="validateAccount()"
        @change="() => { hasChanges = true }"
        required
        minlength="1"
        maxlength="100" />
    </td>
    <td v-if="account.type === 'Локальная'">
      <input
        type="password"
        v-model="account.password"
        @blur="validateAccount()"
        @change="() => { hasChanges = true }"
        required
        minlength="1"
        maxlength="100" />
    </td>
    <td>
      <button @click="emit('remove')">Удалить</button>
    </td>
  </tr>
</template>
<script lang="ts" setup>
import type { Account, AccountLabelElement } from '~/types/account'

const { account } = defineProps<{
  account: Account
}>()
const accountStore = useAccountStore()
const hasChanges = ref<boolean>(false)
const tr = ref<HTMLTableRowElement>()
const emit = defineEmits(['remove'])

const validateAccount = () => {
  if (
    hasChanges.value &&
    [...(tr.value as HTMLTableRowElement).querySelectorAll(':where(input, select)')].every((el) => (el as HTMLInputElement | HTMLSelectElement).validity.valid)
  ) {
    accountStore.updateAccount({
      ...account,
      password: account.type === 'Локальная' ? account.password : undefined
    })
    hasChanges.value = false
  }
}
</script>
<style scoped>
:is(input, select):invalid {
  border: red solid 1px;
}
</style>
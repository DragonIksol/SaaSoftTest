<template>
  <tr ref="tr">
    <td>
      <div class="hflex">
        <input
          type="text"
          :value="account.label.map((x: AccountLabelElement) => x.text).join(';')"
          @input="e => account.label = (e.target as HTMLInputElement).value.split(';').map((x: string) => { return { text: x } })"
          @blur="validateAccount()"
          @change="() => { hasChanges = true }"
          maxlength="50" />
      </div>
    </td>
    <td>
      <div class="hflex">
        <select v-model="account.type" @change="validateAccount()" required>
          <option value="LDAP">LDAP</option>
          <option value="Локальная">Локальная</option>
        </select>
      </div>
    </td>
    <td :colspan="account.type === 'Локальная' ? 1 : 2">
      <div class="hflex">
        <input
          type="text"
          v-model="account.login"
          @blur="validateAccount()"
          @change="() => { hasChanges = true }"
          required
          minlength="1"
          maxlength="100" />

      </div>
    </td>
    <td v-if="account.type === 'Локальная'">
      <div class="hflex">
        <input
          :type="passwordInputType"
          v-model="account.password"
          @blur="validateAccount()"
          @change="() => { hasChanges = true }"
          required
          minlength="1"
          maxlength="100" />
          <img :src="eyeSrc" class="icon password-visibility" @click="togglePasswordInputType()"/>
      </div>
    </td>
    <td>
      <button class="icon delete-btn" @click="emit('remove')"></button>
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
const passwordInputType = ref('password')
const eyeSrc = ref('/icons/eye-crossed.svg')

const emit = defineEmits(['remove'])

const togglePasswordInputType = () => {
  /**
   * Меняет видимость пароля
   */
  passwordInputType.value = passwordInputType.value === 'password' ? 'text' : 'password';
  eyeSrc.value = passwordInputType.value === 'password' ? '/icons/eye-crossed.svg' : '/icons/eye.svg';
}

const validateAccount = () => {
  /**
   * Проверяет наличие изменений в строке, проверяет валидацию у полей строки и, если внесены корректные изменения, отправляет запрос на сохранение аккаунта
   */
  if (
    hasChanges.value &&
    [...(tr.value as HTMLTableRowElement).querySelectorAll(':where(input, select)')].every((el) => (el as HTMLInputElement | HTMLSelectElement).validity.valid)
  ) {
    accountStore.saveAccount({
      ...account,
      password: account.type === 'Локальная' ? account.password : undefined
    })
    hasChanges.value = false
  }
}
</script>
<style scoped>
.hflex {
  padding: 0;
}
.hflex>*:not(.icon) {
  flex: 1;
}

:is(input, select):invalid {
  border: red solid 1px;
  width: 100%;
}

.delete-btn {
  background-image: url(/icons/trash.svg);
  cursor: pointer;
}

.password-visibility {
  cursor: pointer;
}
</style>
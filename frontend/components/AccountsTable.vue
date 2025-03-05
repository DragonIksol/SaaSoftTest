<template>
    <div>
        <h2>Учетные записи <button @click="addAccount">+</button></h2>
        <div>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</div>

        <table>
          <thead>
            <tr>
              <th>Метка</th>
              <th>Тип записи</th>
              <th>Логин</th>
              <th>Пароль</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AccountRow v-for="(account, index) in accounts" :key="account.id"
              :account="account"
              @remove="removeAccount(index)"
            />
          </tbody>
        </table>
    </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import type { Account } from '~/types/account'

export default {
  setup() {
    const accountStore = useAccountStore()
    accountStore.fetchAccounts()
    const accounts = computed(() => accountStore.accounts)

    const addAccount = () => {
      accountStore.addAccount({
        label: [{text: ''}],
        type: '',
        login: '',
        password: '',
      })
    }

    const removeAccount = (index: number) => {
      accountStore.removeAccount(index)
    }

    // const validateAccount = (index: number) => {
    //   const account = accounts.value[index]
    //   console.log(account);
      
    //   if (hasChanges.value) {
    //     if (
    //       account.label.length <= 50 &&
    //       (account.login.length > 0 && account.login.length <= 100) &&
    //       account.type &&
    //       (
    //         account.type === 'Локальная' ? (account.password as string).length > 0 && (account.password as string).length <= 100 : true
    //       )
    //     ) {
    //         accountStore.updateAccount(index, {
    //           label: account.label,
    //           type: account.type,
    //           login: account.login,
    //           password: account.type === 'Локальная' ? account.password : undefined
    //         })
    //     }
    //   }
    //   // account.labelValid = account.label.length <= 50
    //   // account.loginValid = account.login.length > 0 && account.login.length <= 100
    //   // if (account.type === 'Локальная') {
    //   //   account.passwordValid = account.password.length > 0 && account.password.length <= 100
    //   // } else {
    //   //   account.passwordValid = true
    //   // }

    //   // if (account.labelValid && account.loginValid && account.passwordValid) {
    //   //   // Преобразование метки в массив объектов
    //   //   const labels = account.label.split(';').filter(Boolean).map(label => (label))
    //   //   accountStore.updateAccount(index, {
    //   //     label: labels,
    //   //     type: account.type,
    //   //     login: account.login,
    //   //     password: account.type === 'Локальная' ? account.password : undefined
    //   //   })
    //   // }
    // }

    return {
      accounts,
      addAccount,
      removeAccount,
      // validateAccount
    }
  }
}
</script>

<style>
.row {
  display: flex;

}
</style>
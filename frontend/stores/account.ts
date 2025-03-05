import { defineStore } from 'pinia'
import type { Account } from '~/types/account'

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    accounts: [] as Account[]
  }),
  actions: {
    async fetchAccounts() {
      /**
       * Получение массива всех аккаунтов
       */
      const response = await $fetch('/api/account', {
        method: 'get'
      })
      const unsavedAccounts = this.accounts.filter(account => account.id === undefined)
      this.accounts = [...response.accounts, ...unsavedAccounts]
    },

    async addAccount(account: Account) {
      /**
       * Добавляет аккаунт в локальный массив аккаунтов
       */
      this.accounts.push(account)
    },

    async removeAccount(index: number) {
      /**
       * Совершает запрос на удаление аккаунта при наличии account.id или удаляет из локального массива аккаунтов
       */
      const account = this.accounts[index];
      if (account.id !== undefined) {
        await $fetch('/api/account', {
          method: 'delete',
          body: { id: account.id }
        })
        this.fetchAccounts()
      } else {
        this.accounts.splice(index, 1)
      }
    },

    async saveAccount(account: Account) {
      /**
       * Сохранение аккаунта
       * При наличии account.id обновляет существующий аккаунт
       * При отсутствии создаёт новый аккаунт
       */
      if (account.id !== undefined) {
        await $fetch('/api/account', {
          method: 'put',
          body: account
        })
      } else {
        const accIndex = this.accounts.indexOf(account)
        if (accIndex !== -1) this.removeAccount(accIndex)
        await $fetch('/api/account', {
          method: 'post',
          body: account
        })
        this.fetchAccounts()
      }
    }
  }
})
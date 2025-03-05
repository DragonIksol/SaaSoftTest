import { defineStore } from 'pinia'
import type { Account } from '~/types/account'

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    accounts: [] as Account[]
  }),
  actions: {
    async fetchAccounts() {
      const response = await $fetch('/api/account', {
        method: 'get'
      })
      this.accounts = response.accounts
    },

    async addAccount(account: Account) {
      this.accounts.push(account)
    },

    async removeAccount(index: number) {
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

    async updateAccount(account: Partial<Account>) {
      if (account.id !== undefined) {
        const response = await $fetch('/api/account', {
          method: 'put',
          body: account
        })
      } else {
        const response = await $fetch('/api/account', {
          method: 'post',
          body: account
        })
        this.fetchAccounts()
      }
    }
  }
})
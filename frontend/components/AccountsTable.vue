<template>
    <div class="vflex acc-table-container">
        <h2 class="hflex table-header">Учетные записи <button @click="addAccount" class="add-btn">+</button></h2>
        <div class="hflex help"><img src="/icons/interrogation.svg" alt="interrogation" class="icon-medium">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</div>

        <table class="accounts-table">
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
<script lang="ts" setup>
import { computed } from 'vue'

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
</script>

<style scoped>
.acc-table-container {
  height: 100%;
  overflow: auto;
}

.accounts-table {
  border-spacing: 1em;
}
.accounts-table th {
  text-align: left;
  color: var(--header-color);
  font-weight: normal;
}

.add-btn {
  width: 50px;
  height: 50px;
  border: 2px solid var(--border-color);
  border-radius: var(--main-border-radius);
  background-color: #0000;
  cursor: pointer;
  font-size: xx-large;
}
.add-btn:hover {
  background-color: var(--border-color);
}
.add-btn:active {
  background-color: var(--active-color);
}

.help {
  background-color: var(--border-color);
}
.table-header, .help {
  margin-left: 1em;
  margin-right: 1em;
}

.table-header {
  padding-left: 0;
}

</style>
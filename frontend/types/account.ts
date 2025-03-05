export interface AccountLabelElement {
  text: string
}

export interface Account {
  id?: number
  label: AccountLabelElement[];
  type: string;
  login: string;
  password?: string;
}

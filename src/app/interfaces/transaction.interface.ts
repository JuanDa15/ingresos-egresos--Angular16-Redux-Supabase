export interface Transaction {
  description: string,
  amount: number,
  uid?: string,
  type: 'income' | 'outcome',
  created_at?: Date,
  id?: string
}

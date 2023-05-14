export interface DBUser {
  uid : string,
  names: string | null,
  last_names: string | null,
  email: string,
  completed: boolean,
  created_at: Date
}

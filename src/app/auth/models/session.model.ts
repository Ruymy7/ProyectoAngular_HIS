interface User {
  _id: string
  email: string
  name: string
}

export interface Session {
  token: string
  user: User
}

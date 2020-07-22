interface Address {
  street: string
  number: string
  door?: string
  postalCode: string
  city: string
}

export interface User {
  id: string
  name: string
  lastName: string
  secondLastName?: string
  gender?: string
  birthdate?: string
  idNumber?: string
  address?: Address
}

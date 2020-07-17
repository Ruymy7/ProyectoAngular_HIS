import { User } from "./user.model";

type professional = 'Médico' | 'Enfermero' | 'Administrativo' | ''

export interface Professional extends User{
  medicalBoardNumber: string
  professionalType?: professional
}

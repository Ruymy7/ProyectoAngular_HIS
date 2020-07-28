export class LogInResponseDto {
  status: boolean
  data: {
    token: string
    user: {
      _id: string
      email: string
      name: string
    }
  }
}

import { AuthDto } from '@/auth/dtos/auth.dto'

export const getAuthorization = (context: any): AuthDto | null => {
  if (context?.authDto == null) {
    return null
  }
  return context.authDto
}

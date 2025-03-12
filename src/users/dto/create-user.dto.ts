export class CreateUserDto {
    name: string
    email: string
    phone: string
    role: string[]
    schoolId: number
    password: string
    confirm_password: string
}
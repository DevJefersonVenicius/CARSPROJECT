import { IsEmail, IsString, IsStrongPassword, MinLength, MaxLength, IsOptional } from "class-validator";

export class CreateUserDTO {
    @MinLength(4, {message:"nameUser: O minímo de caracteres permitidos é 4."})
    @MaxLength(30, {message:`nameUser: O máximo de caracteres permitidos é 30.`})
    @IsString({message:'nameUser: Usuário inválido.'})
    nameUser: string // Nome de usuário

    @IsEmail({}, {message:'email: Endereço de email inválido.'})
    email: string // Email

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1, 
        minSymbols: 1, 
        minLowercase: 1, 
        minNumbers: 2,
    },{message:'password: A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um símbolo e dois números.'})
    password: string // Senha

    @IsString({message:'cpf: Cpf inválido.'})
    @MinLength(11, {message:'cpf: O minímo de números permitidos é 11'})
    @MaxLength(14, {message:'cpf: O cpf deve conter no máximo 14 caracteres levando em consideração pontos "." e hífen "-".'})
    @IsOptional()
    cpf?: string // cpf? - Cpf poderá ficar nulo no banco de dados

}

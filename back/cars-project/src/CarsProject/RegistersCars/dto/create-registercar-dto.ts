import { IsString, IsNumberString, IsOptional, MinLength, MaxLength } from "class-validator";

export class CreateRegisterCarDTO {
    @IsString({message:'nameCar: Nome do carro inválido.'})
    nameCar: string // Nome do carro

    @IsString({message:'brand: Marca inválida.'})
    brand: string // Marca

    @IsString({message:'model: Modelo inválido.'})
    model: string // Modelo

    @IsString({message:'version: Versão inválida.'})
    version: string // Versão

    @IsString({message:'color: Cor inválida.'})
    color: string // Cor
    
    @IsString({message:'description: Descrição inválida.'})
    description: string // Descrição

    @IsString({message:'accessories: Acessório inválido.'})
    accessories: string // Acessórios

    @IsString({message:'location: Localização inválida.'})
    location: string // Localização

    @IsString({message:'phone: Telefone inválido.'})
    phone: string // Telefone

    @MinLength(4, {message:'year: O minímo de caracteres permitido é 4.'})
    @MaxLength(10, {message:'year: O máximo de caracteres permitido é 10.'})
    @IsString()
    year: string // Ano de fabricação

    @IsNumberString({}, {message:'km: Kilômetros inválido.'})  
    km: string // Km

    @IsNumberString({}, {message:'price: Preço inválido.'}) 
    @IsOptional()
    price?: string // Preço

    @IsString({message:'images: Imagem inválida.'}) 
    @IsOptional()
    images?: string // Imagens
    
}

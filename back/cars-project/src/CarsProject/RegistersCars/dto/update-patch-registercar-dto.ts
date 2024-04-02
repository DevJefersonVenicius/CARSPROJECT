import { PartialType } from "@nestjs/mapped-types";
import { CreateRegisterCarDTO } from "./create-registercar-dto";

export class UpdatePatchRegisterCarDTO extends PartialType(CreateRegisterCarDTO) {
    
}

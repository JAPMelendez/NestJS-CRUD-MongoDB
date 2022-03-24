import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto{
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly author: string;
    @ApiProperty()
    readonly publishyear: string;
}
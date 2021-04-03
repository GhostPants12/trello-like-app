import {ApiProperty} from "@nestjs/swagger"

export class CardDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}
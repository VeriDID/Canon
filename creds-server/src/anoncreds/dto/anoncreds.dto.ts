import { ApiProperty } from '@nestjs/swagger';

export class AnoncredsDto {
    
    @ApiProperty({ example: "did:indy:pool:localtest:TL1EaPFCZ8Si5aUrqScBDt"})
    issuerId: string;

    @ApiProperty({ example: "CredDef1"})
    tag: string;

    @ApiProperty({ example: "TL1EaPFCZ8Si5aUrqScBDt:2:Identity:1.3"})
    schemaId: string;

    @ApiProperty({ example: "Identity"})
    schemaName: string;

    @ApiProperty({ example: "1.3"})
    schemaVersion: string;
    
    @ApiProperty({ example: ["name", "age"]})
    attrNames: string[]
  }
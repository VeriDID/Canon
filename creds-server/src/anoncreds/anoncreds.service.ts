import { Injectable } from '@nestjs/common';
import { AnoncredsDto } from './dto/anoncreds.dto';
import type {
    AnonCredsCredential,
    AnonCredsCredentialDefinition,
    AnonCredsCredentialInfo,
    AnonCredsCredentialOffer,
} from '@aries-framework/anoncreds'
import type { JsonObject } from '@hyperledger/anoncreds-nodejs'

import { Schema, CredentialDefinition } from '@hyperledger/anoncreds-nodejs'


@Injectable()
export class AnoncredsService {


    createCredDef(anoncredsDto: AnoncredsDto) {
        const schema = Schema.create({
            issuerId: anoncredsDto.issuerId,
            attributeNames: anoncredsDto.attrNames,
            name: anoncredsDto.schemaName,
            version: anoncredsDto.schemaVersion,
        })
        
        const { credentialDefinition, credentialDefinitionPrivate, keyCorrectnessProof } = CredentialDefinition.create({
            issuerId: anoncredsDto.issuerId,
            schema,
            schemaId: anoncredsDto.schemaId,
            signatureType: 'CL',
            supportRevocation: false, 
            tag: anoncredsDto.tag,
        })
        
        console.log("CredDef=", credentialDefinition.toJson())
        console.log("credentialDefinitionPrivate=", credentialDefinitionPrivate.toJson())
        console.log("keyCorrectnessProof=", keyCorrectnessProof.toJson())

        const returnObj = {
            credentialDefinition: credentialDefinition.toJson() as unknown as AnonCredsCredentialDefinition,
            credentialDefinitionPrivate: credentialDefinitionPrivate.toJson() as unknown as JsonObject,
            keyCorrectnessProof: keyCorrectnessProof.toJson() as unknown as JsonObject,
            schema: schema.toJson() as unknown as Schema,
        }

        console.log("Return =", returnObj )
        return returnObj;
    }

}

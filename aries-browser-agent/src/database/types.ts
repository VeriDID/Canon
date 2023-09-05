// types.ts
export interface ISchema {
    schemaid: string;
    name: string;
    txid: string;
}

export interface ICredDef {
    creddefid: string;
    schemaid: string;
    tag: string;
    txid: string;
}
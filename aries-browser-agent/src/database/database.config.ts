// database.config.ts
import Dexie from "dexie";

const canondatabase = new Dexie("canon-database");
canondatabase.version(1).stores({
  schemas: 'schemaid, name, txid',
  credefs: 'creddefid, schemaid, tag, txid'
});

export const schemaTable = canondatabase.table('schemas');
export const credefsTable = canondatabase.table('credefs');

export default canondatabase;
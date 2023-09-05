import { useAries } from "./AriesProvider";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Logger } from "tslog"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'

import {useLiveQuery} from "dexie-react-hooks";
import {schemaTable} from "./database/database.config";
import {ISchema} from "./database/types";

const log = new Logger({ name: "Schemas" })
interface CreateSchemaProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function CreateSchema({ open, setOpen }: CreateSchemaProps) {
  const { agent } = useAries();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const [schemaName, setSchemaName] = useState("");
  const [hash, setHash] = useState("")
  const contractABI = [{
    name: 'registerSchema',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
        {
            "internalType": "address",
            "name": "_schema_owner",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_trust_registry",
            "type": "address"
        },
        {
            "internalType": "uint8",
            "name": "_version",
            "type": "uint8"
        },
        {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        },
        {
            "internalType": "string[]",
            "name": "_attributes",
            "type": "string[]"
        }
    ],
    outputs: [{
        "internalType": "bytes20",
        "name": "_schema_id",
        "type": "bytes20"
    }],
  }];

  useEffect(() => { connect(); }, []);

  const { config, error } = usePrepareContractWrite({
    address: '0xfb26376e2EC13cE5804e580dA1488184a52a3F45',
    abi: contractABI,
    functionName: 'registerSchema',
    args: ['0xc89Fb7a0d974a7381d2bAf5e9613E806130C394B', '0xBd2c938B9F6Bfc1A66368D08CB44dC3EB2aE27bE', 2, schemaName, ['Name', 'City']]
  })

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ 
    hash: data?.hash,
    onSuccess(returnval) {
      console.log('returnval=', returnval)
      console.log('SchemaId=', returnval?.logs[0]?.topics[1])
      const schema: ISchema = {
        schemaid: returnval?.logs[0]?.topics[1].slice(0, 42),
        name: schemaName,
        txid: returnval?.transactionHash
      }
      try {
          // Add the new schema
          schemaTable.add(schema);
      } catch (error) {
          console.error(`Failed to add ${schemaName}: ${error}`);
      }      
    }
  });


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      New Schema
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Schema Name
                        </label>
                        <div className="mt-2">
                          <input
                            name="schemaName"
                            id="schemaName"
                            value={schemaName}
                            onChange={(e) => setSchemaName(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="birth-certificate"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={async () => { write?.(); setOpen(false);}}
                  >
                    Register invitation
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}


export default function Schemas() {
  const [showSchema, setShowSchema] = useState(false);
  const schemas = useLiveQuery(
    () => schemaTable.toArray()
  );
  return (
    <>
      <CreateSchema open={showSchema} setOpen={setShowSchema} />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Schemas
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              All of your registered schemas.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex">
            <button
              onClick={async () => {
                setShowSchema(true);
              }}
              type="button"
              className="mt-2 sm:mt-0 sm:ml-3 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register Schema
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Schema Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {schemas?.map(schema => <tr>
                      <td>{schema.schemaid}</td>
                      <td>{schema.name}</td>
                      <td>{schema.txid}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

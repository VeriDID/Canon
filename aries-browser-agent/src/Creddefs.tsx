import { useAgent } from "@aries-framework/react-hooks";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Logger } from "tslog"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import {useLiveQuery} from "dexie-react-hooks";
import axios from "axios"

import {credefsTable} from "./database/database.config";
import {ICredDef} from "./database/types";

interface CreateCredDefProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function CreateCredDef({ open, setOpen }: CreateCredDefProps) {
  const agent = useAgent();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const [hash, setHash] = useState("")  
  const [credDefName, setCredDefName] = useState("");
  const [credDefData, setCredDefData] = useState("asdf");

  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_cred_def_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_trust_registry",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_revocation_registry",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "_signature",
          "type": "uint8"
        },
        {
          "internalType": "bytes20",
          "name": "_schema_id",
          "type": "bytes20"
        },
        {
          "internalType": "string",
          "name": "_tag",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_creddef_data",
          "type": "string"
        }
      ],
      "name": "registerCredDef",
      "outputs": [
        {
          "internalType": "bytes20",
          "name": "",
          "type": "bytes20"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  useEffect(() => { connect(); }, []);

  const { config, error } = usePrepareContractWrite({
    address: '0x8982785987f346E5b528CD26A72a03A7D07aFc71',
    abi: contractABI,
    functionName: 'registerCredDef',
    args: [
      '0xc89Fb7a0d974a7381d2bAf5e9613E806130C394B', 
      '0xBd2c938B9F6Bfc1A66368D08CB44dC3EB2aE27bE', 
      '0xBd2c938B9F6Bfc1A66368D08CB44dC3EB2aE27bE', 
      2, 
      '0xd6b4ded1d78badabfda82f2be0e8b7b0691762c6',
      credDefName,
      credDefData
    ]
  })

  const callCredDef = async () => {
    console.log("Call to create Cred Def data");
    const response = await axios.post('http://credserver.veridid.services:3000/anoncreds/create', {
      "issuerId": "did:canon:veridid:account:c89Fb7a0d974a7381d2bAf5e9613E806130C394B",
      "tag": "CredDef1",
      "schemaId": "did:canon:veridid:schema:425ce3e23548547ec6d904567d8c87460d5b95e8",
      "schemaName": "Person",
      "schemaVersion": "1.0",
      "attrNames": ['name', 'age']
    });
    console.log("Cred Def Data: ",response.data);
    setCredDefData("This is a test"); // JSON.stringify(response.data?.credentialDefinition));
    write?.();

  };

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ 
    hash: data?.hash,
    onSuccess(returnval) {
      console.log('CredDefId=', returnval)
      const creddef: ICredDef = {
        creddefid: 'asdf', //returnval?.logs[0]?.topics[1].slice(0, 42),
        schemaid: '0xd6b4ded1d78badabfda82f2be0e8b7b0691762c6',
        tag: credDefName,
        txid: returnval?.transactionHash
      }
      try {
          // Add the new credential definition
          console.log('CredDef=', creddef)
          credefsTable.add(creddef);
      } catch (error) {
          console.error(`Failed to add ${credDefName}: ${error}`);
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
                      New Credential Definition
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Credeential Defintion Tag
                        </label>
                        <div className="mt-2">
                          <input
                            name="credDefName"
                            id="credDefName"
                            value={credDefName}
                            onChange={(e) => setCredDefName(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="ontario-birth-certificate"
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
                    onClick={async () => { callCredDef();  setOpen(false);}}
                  >
                    Register Credential Definition
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


export default function Creddefs() {
  const [showCredDef, setShowCredDef] = useState(false);
  const creddefs = useLiveQuery(
    () => credefsTable.toArray()
  );  
  return (
    <>
      <CreateCredDef open={showCredDef} setOpen={setShowCredDef} />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Credential Definitions
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              All of your credential definitions.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex">
            <button
                onClick={async () => {
                  setShowCredDef(true);
                }}
                type="button"
                className="mt-2 sm:mt-0 sm:ml-3 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register Credential Definition
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
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tag
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Schema Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {creddefs?.map(creddef => <tr>
                      <td>{creddef.creddefid}</td>
                      <td>{creddef.schemaid}</td>
                      <td>{creddef.tag}</td>
                      <td>{creddef.txid}</td>
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

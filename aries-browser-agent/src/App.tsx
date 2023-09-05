import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import "./App.css";
import { AriesProvider } from "./AriesProvider";
import ChatUI from "./Chat";
import Connections from "./Connections";
import CreateAgent from "./CreateAgent";
import Schemas from "./Schemas";
import Creddefs from "./Creddefs";
import Credential from "./Credential";
import Credentials from "./Credentials";
import Dashboard from "./Dashboard";
import Proofs from "./Proofs";
import Proof from "./Proof";
import { WagmiConfig, createConfig } from 'wagmi'
import { createPublicClient, http } from 'viem'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<CreateAgent />} />
      <Route path="/login" element={<CreateAgent />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="" element={<Connections />} />
        <Route path="schemas" element={<Schemas />} />
        <Route path="creddefs" element={<Creddefs />} />
        <Route path="connections" element={<Connections />} />
        <Route path="credentials" element={<Credentials />} />
        <Route path="proofs" element={<Proofs />} />
        <Route path="chat/:connectionId" element={<ChatUI />} />
        <Route path="credentials/:credentialId" element={<Credential />} />
        <Route path="proofs/:proofId" element={<Proof />} />
      </Route>
    </Route>
  )
);

export const canon = {
  id: 2023,
  name: 'Canon',
  network: 'Canon',
  nativeCurrency: {
    decimals: 18,
    name: 'Canon',
    symbol: 'CAN',
  },
  rpcUrls: {
    public: { http: ['http://35.182.139.254:8545'] },
    default: { http: ['http://35.182.139.254:8545'] },
  },
  blockExplorers: {
    etherscan: { name: 'Sirato', url: 'http://3.99.132.224' },
    default: { name: 'Sirato', url: 'http://3.99.132.224' },
  },
  contracts: {
    multicall3: {
      address: '0xDF3149B11d7457eA472a56463bB9c0928fC25946',
      blockCreated: 10957,
    },
  },
} 

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: canon,
    transport: http()
  }),
})


function App() {
  return (
    <WagmiConfig config={config}>
      <AriesProvider>
        <RouterProvider router={router} />
      </AriesProvider>
    </WagmiConfig>
  );
}
export default App;
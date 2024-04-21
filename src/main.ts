import { start } from "polkadot-api/smoldot"
import { chainSpec as westendChainspec } from "polkadot-api/chains/westend2"
import { chainSpec as ahChainspec } from "polkadot-api/chains/westend2_asset_hub"
import { WebSocketProvider } from "polkadot-api/ws-provider/node"
import { createClient } from "polkadot-api"
import { wah } from "@polkadot-api/descriptors"

const client = createClient(WebSocketProvider("wss://westmint-rpc.dwellir.com"))

const ahApi = client.getTypedApi(wah)

// const allPools = await ahApi.query.AssetConversion.Pools.getEntries()
// for (const pool of allPools) {
//   console.log("pool", pool.value)
//   console.log(JSON.stringify(pool.keyArgs, undefined, 2))
// }

const pool = await ahApi.query.AssetConversion.Pools.getValue([
  { parents: 1, interior: { type: "Here" } },
  {
    parents: 0,
    interior: {
      type: "X2",
      value: [
        {
          type: "PalletInstance",
          value: 50,
        },
        {
          type: "GeneralIndex",
          value: 19801204,
        },
      ],
    },
  },
])
console.log("The best pool is :")
console.log(JSON.stringify(pool, undefined, 2))

client.destroy()

process.exit(0)

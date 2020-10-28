export interface genesisStatesType {
  names: {
    [key: string]: string
  }
  [key: string]: {}
}

export interface chainsType {
  names: {
    [key: string]: string
  }
  [key: string]: any
}

export interface Chain {
  name: string
  chainId: number
  networkId: number
  comment: string
  url: string
  genesis: GenesisBlock
  hardforks: Hardfork[]
  bootstrapNodes: BootstrapNode[]
}

export interface eipsType {
  [key: number]: any
}

export interface GenesisBlock {
  hash: string
  timestamp: string | null
  smokeLimit: number
  difficulty: number
  nonce: string
  extraData: string
  stateRoot: string
}

export interface Hardfork {
  name: string
  block: number | null
}

export interface BootstrapNode {
  ip: string
  port: number | string
  network?: string
  chainId?: number
  id: string
  location: string
  comment: string
}
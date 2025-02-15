import '@ckb-js/kuai-core'
import type { Config } from '@ckb-lumos/config-manager'

declare module '@ckb-js/kuai-core' {
  export interface KuaiConfig {
    port?: number
    rpcUrl: string
    lumosConfig?: Config | 'aggron4' | 'lina'
  }
}

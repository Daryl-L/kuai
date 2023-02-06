import { CellChangeData } from '@ckb-js/kuai-models'
import { Cell, helpers, commons, config } from '@ckb-lumos/lumos'
import { SECP_SIGNATURE_PLACEHOLDER, OMNILOCK_SIGNATURE_PLACEHOLDER } from '@ckb-lumos/common-scripts/lib/helper'
import { blockchain } from '@ckb-lumos/base'
import { bytes } from '@ckb-lumos/codec'

export class Tx {
  static async toJson(
    txSkeleton: helpers.TransactionSkeletonType,
    inputData: CellChangeData[],
    outputCells: Cell[],
  ): Promise<string> {
    txSkeleton.update('outputs', (outputs) => {
      return outputs.push(...outputCells)
    })

    for (const [input, witness] of inputData) {
      txSkeleton.update('inputs', (inputs) => inputs.push(input))

      txSkeleton.update('witnesses', (witnesses) => {
        if (witness == '0x' || witness.length == 0) {
          const omniLock = config.getConfig().SCRIPTS.OMNI_LOCK as NonNullable<config.ScriptConfig>
          const fromLockScript = input.cellOutput.lock
          if (omniLock.CODE_HASH === fromLockScript.codeHash && fromLockScript.hashType === omniLock.HASH_TYPE) {
            return witnesses.push(bytes.hexify(blockchain.WitnessArgs.pack({ lock: OMNILOCK_SIGNATURE_PLACEHOLDER })))
          } else {
            return witnesses.push(bytes.hexify(blockchain.WitnessArgs.pack({ lock: SECP_SIGNATURE_PLACEHOLDER })))
          }
        }
        return witnesses.push(witness)
      })
    }

    txSkeleton = commons.common.prepareSigningEntries(txSkeleton)

    return JSON.stringify({
      tx: helpers.createTransactionFromSkeleton(txSkeleton),
    })
  }
}

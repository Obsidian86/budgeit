import * as snS from './snapshotFunctions'
import * as mem from './storage'
import * as bdg from './budgetFunctions'
import * as src from './sourcesFunctions'
import * as acn from './accountFunctions'
import * as vFn from './viewFunctions'
import * as sav from './savingsTableFunctions'

export default {
  ...snS,
  ...mem,
  ...bdg,
  ...src,
  ...acn,
  ...vFn,
  ...sav
}
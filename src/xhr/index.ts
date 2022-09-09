import { UnitCode } from '@/types'

const url = process.env.VUE_APP_BE_URL

export const deleteUnitCode = (id: string) => fetch(`${url}/unitcode/${id}`, {
  method: `DELETE`,
}).then((r) => r.json())

export const listUnitCodes = (job: string) => fetch(`${url}/unitcodes?job=${encodeURIComponent(job)}`)
  .then((r) => r.json())

export const saveUnitCodes = (unitCode: UnitCode) => fetch(`${url}/unitcode`, {
  method: `POST`,
  body: JSON.stringify(unitCode),
  headers: {
    'Content-Type': `application/json`,
  },
}).then((r) => ({ success: r.status !== 500, unitCode }))

const url = `http://localhost:4000`

export const del = (id: string) => fetch(`${url}/unitcode/${id}`, {
  method: `DELETE`,
})

export const listUnitCodes = (job: string) => fetch(`${url}/unitcodes?job=${job}`)
  .then((r) => r.json())

export const listOldRecords = (jobName: string, unitName: string) => fetch(`${url}/unitcode/?unit=${unitName}&job=${jobName}`)
  .then((r) => r.json())
  .catch(console.error)

export const saveUnitCodes = (deviceId: string, unitName: string, chosenCodes: string[], jobName: string) => fetch(`${url}/unitcode`, {
  method: `POST`,
  body: JSON.stringify({
    user: deviceId,
    unit: unitName,
    codes: chosenCodes.join(`, `),
    property: jobName,
  }),
  headers: {
    'Content-Type': `application/json`,
  },
}).then((r) => r.json())

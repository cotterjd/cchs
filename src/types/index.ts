export interface UnitCode {
  id?: string
  unit: string
  property: string
  user: string
  codes: string
  createdAt?: string
  updatedAt?: string
}

export interface Bug {
  user: string
  job: string
  version: string
  desc: string
  data: any
}

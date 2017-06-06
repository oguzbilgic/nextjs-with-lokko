import {mutate} from '../libs/lokka.js'

export const createTenant = (name) => (
  mutate(`{
    createTenant(
      name: "${name}"
    ) {
      id
    }
  }`)
)

export const deleteTenant = (id) => (
  mutate(`{
    deleteTenant(
      id: "${id}"
    ) {
      id
    }
  }`)
)

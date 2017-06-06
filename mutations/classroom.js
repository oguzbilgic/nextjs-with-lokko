import {mutate} from '../libs/lokka.js'

export const createClassroom = (id, name) => (
  mutate(`{
    createClassroom(
      tenantId: "${id}"
      name: "${name}"
    ) {
      id
    }
  }`)
)

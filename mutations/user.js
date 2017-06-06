import {mutate, setToken} from '../libs/lokka.js'

export const signinUser = (email, password) => (
  mutate(`{
    signinUser (
      email: {
        email: "${email}"
        password: "${password}"
      }
    ) {
      token
    }
  }`).then(({ signinUser: {token} }) => {
    setToken(token);
  })
)

export const signoutUser = () => (
  setToken(null)
)

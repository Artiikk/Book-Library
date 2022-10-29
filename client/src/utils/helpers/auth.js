import { changeRoute } from './router'

export function checkIfUserIsAuthorized(_, __, next) {
  const isAuthorized = localStorage.getItem('isAuthorized')
  const isTokenPresent = localStorage.getItem('token')

  console.log('isAuthorized', isAuthorized)
  console.log('isTokenPresent', isTokenPresent)

  if (!isAuthorized || !isTokenPresent) {
    return changeRoute('/login')
  }

  next()
}

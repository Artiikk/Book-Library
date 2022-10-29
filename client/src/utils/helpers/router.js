import router from '@/router'

export const changeRoute = (route) => router.push(route)
export const replaceRoute = (route) => router.replace(route)

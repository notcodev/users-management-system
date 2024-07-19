import wretch, { WretchResponse } from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import FormDataAddon from 'wretch/addons/formData'

export type WretchError<ErrorBody> = Error & {
  status: number
  response: WretchResponse
  text: string
  json?: ErrorBody
}

wretch.options({ mode: 'cors', credentials: 'include' })

const API_URL = import.meta.env.VITE_API_BASE as string

const createRequestInstance = () => {
  let token: string | null = null
  const api = wretch(`${API_URL}/api/v1`)
    .addon(QueryStringAddon)
    .addon(FormDataAddon)
    .catcher(401, async (originalError, originalRequest) => {
      try {
        const refreshResult = await wretch(`${API_URL}/api/v1/refresh-tokens`)
          .get()
          .json<{ access_token: string }>()

        token = refreshResult.access_token
        localStorage.setItem('access_token', token)

        return originalRequest.auth(`Bearer ${token}`).fetch().json()
      } catch (error) {
        throw originalError
      }
    })

  return {
    api,
    getToken: () => token || localStorage.getItem('access_token'),
    updateToken: (newToken: string | null) => {
      token = newToken
      token
        ? localStorage.setItem('access_token', token)
        : localStorage.removeItem('access_token')
    },
  }
}

const requestInstace = createRequestInstance()

export const createRequest = <Params = void, Data = unknown>(
  handler: (
    api: typeof requestInstace.api,
    params: Params,
  ) => Promise<Awaited<Data>>,
) => {
  return (params: Params) => {
    const token = requestInstace.getToken()

    return handler(
      token ? requestInstace.api.auth(`Bearer ${token}`) : requestInstace.api,
      params,
    )
  }
}

export const updateToken = requestInstace.updateToken

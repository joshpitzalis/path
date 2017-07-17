import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'
import { GC_AUTH_TOKEN } from './constants'

import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj57mzschvlwl01188wd7opcs'
})
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      const token = localStorage.getItem(GC_AUTH_TOKEN)
      req.options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    }
  }
])

const client = new ApolloClient({ networkInterface })

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
)

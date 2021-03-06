/* eslint-disable camelcase */
import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { AppLoading } from './loading'

export const useAddMutation = (
  add_query,
  read_query,
  m_method,
  m_name,
  variables
) => {
  var a = m_method
  m_method = { m_method }
  const [addItem, { loading, error, data }] = useMutation(add_query, {
    update: (cache, { data: m_method }) => {
      const val = cache.readQuery({ query: read_query, variables: variables })
      const fixtures = val[m_name]
      const test = {}
      test[m_name] = fixtures.concat([m_method[a]])
      cache.writeQuery({
        query: read_query,
        variables: variables,
        data: test
      })
    }
  })

  return [addItem, { loading, error, data }]
}
export const useDeleteMutation = (add_query, read_query, m_method, m_name, variables) => {
  var a = m_method
  m_method = { m_method }
  const [addItem, { loading, error, data }] = useMutation(add_query, {
    update: (cache, { data: m_method }) => {
      const val = cache.readQuery({ query: read_query, variables: variables })
      const fixtures = val[m_name]
      const test = {}
      test[m_name] = fixtures.filter(({id}) => id !== m_method[a].id)
      cache.writeQuery({
        query: read_query,
        variables: variables,
        data: test
      })
    }
  })

  return [addItem, { loading, error, data }]
}

export const Loading = AppLoading

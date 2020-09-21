import { useContext, createContext } from 'react'
import { types, onSnapshot } from 'mobx-state-tree'

import { Movies } from './Movies'
import { Settings } from './Settings'

const RootModel = types.model({
  movies: Movies,
  settings: Settings
})

const defaultSettings = {
  showingCreateMovieModal: false,
  showingEditMovieModal: false,
  selectedMovie: undefined
}

let initialData = {
  movies: { items: [] },
  settings: defaultSettings
}

const data = window.localStorage.getItem('rootState')
if (data) {
  const json = JSON.parse(data)
  if (RootModel.is(json)) {
    initialData = { ...initialData, movies: json.movies }
  }
}

const initialState = RootModel.create(initialData)

export const rootStore = initialState

onSnapshot(rootStore, snapshot => {
  window.localStorage.setItem('rootState', JSON.stringify(snapshot))
})

const RootStoreContext = createContext()
export const Provider = RootStoreContext.Provider

export function useMst () {
  const context = useContext(RootStoreContext)
  if (!context) {
    throw new Error('No provider, please add a context provider')
  }
  return context
}

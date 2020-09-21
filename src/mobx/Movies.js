import {
  types,
  getParent,
  destroy
} from 'mobx-state-tree'

import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdef', 4)

export const TimeItem = types
  .model({
    id: types.optional(types.identifier, () => nanoid(4)),
    time: types.number,
    estadoActivo: types.boolean
  })
  .actions(self => ({
    updateData (time, estadoActivo) {
      self.time = time
      self.estadoActivo = estadoActivo
      getParent(self, 5).settings.hideEditScheduleMovie()
    },
    handleRemove () {
      getParent(self, 2).removeTimeItem(self)
    },
    handleEdit () {
      getParent(self, 5).settings.showEditScheduleMovie(self)
    }
  }))

export const MovieItem = types
  .model({
    id: types.optional(types.identifier, () => nanoid(4)),
    nombre: types.string,
    fecha: types.number,
    estadoActivo: types.boolean,
    horarios: types.optional(types.array(TimeItem), [])
  })
  .actions(self => ({
    updateData (nombre, fecha, estadoActivo) {
      self.nombre = nombre
      self.fecha = fecha
      self.estadoActivo = estadoActivo
      getParent(self, 3).settings.hideEditMovie()
    },
    handleRemove () {
      getParent(self, 2).remove(self)
    },
    handleEdit () {
      getParent(self, 3).settings.showEditMovie(self)
    },
    handleSchedule () {
      getParent(self, 3).settings.showScheduleMovie(self)
    },
    addTimeItem (timeItem) {
      self.horarios.push(timeItem)
      getParent(self, 3).settings.hideCreateScheduleMovie()
    },
    removeTimeItem (timeItem) {
      destroy(timeItem)
    }
  }))

export const Movies = types
  .model({
    items: types.optional(types.array(MovieItem), [])
  })
  .actions(self => ({
    addMovieItem (movieItem) {
      self.items.push(movieItem)
      getParent(self, 1).settings.hideCreateMovie()
    },
    remove (movieItem) {
      destroy(movieItem)
    }
  }))

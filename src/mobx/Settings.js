import {
  types
} from 'mobx-state-tree'

import { MovieItem, TimeItem } from './Movies'

export const Settings = types
  .model({
    showingCreateMovieModal: types.optional(types.boolean, false),
    showingEditMovieModal: types.optional(types.boolean, false),
    showingScheduleMovieView: types.optional(types.boolean, false),
    showingCreateScheduleMovieModal: types.optional(types.boolean, false),
    showingEditScheduleMovieModal: types.optional(types.boolean, false),
    selectedMovie: types.maybe(types.reference(types.late(() => MovieItem))),
    selectedTime: types.maybe(types.reference(types.late(() => TimeItem)))
  })
  .actions(self => ({
    showCreateMovie () {
      self.showingCreateMovieModal = true
    },
    hideCreateMovie () {
      self.showingCreateMovieModal = false
    },
    showEditMovie (movieItem) {
      self.selectedMovie = movieItem
      self.showingEditMovieModal = true
    },
    hideEditMovie () {
      self.showingEditMovieModal = false
      self.selectedMovie = undefined
    },
    showScheduleMovie (movieItem) {
      self.selectedMovie = movieItem
      self.showingScheduleMovieView = true
    },
    hideScheduleMovie () {
      self.showingScheduleMovieView = false
      self.selectedMovie = undefined
    },
    showCreateScheduleMovie () {
      self.showingCreateScheduleMovieModal = true
    },
    hideCreateScheduleMovie () {
      self.showingCreateScheduleMovieModal = false
    },
    showEditScheduleMovie (timeItem) {
      self.selectedTime = timeItem
      self.showingEditScheduleMovieModal = true
    },
    hideEditScheduleMovie () {
      self.showingEditScheduleMovieModal = false
      self.selectedTime = undefined
    }
  }))

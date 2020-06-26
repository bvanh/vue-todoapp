import Vue from 'vue'
import Vuex from 'vuex'
import actions from './mutation-types'
// import { TRUE } from 'node-sass'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: [
      {
        id: 1,
        description: "DEMO",
        isCompleted: false
      },
      {
        id: 2,
        description: "DEMO 2",
        isCompleted: true
      },
      {
        id: 3,
        description: "DEMO 3",
        isCompleted: false
      },
      {
        id: 4,
        description: "DEMO 4",
        isCompleted: true
      },
      {
        id: 5,
        description: "DEMO 5",
        isCompleted: true
      },
    ]
  },
  mutations: {
    [actions.ADD_TODO](state, payload) {
      let newTodoList = [...state.todoList];
      let newTodo = {
        id: newTodoList.length + 1,
        description: payload,
        isCompleted: false
      }
      state.todoList.push(newTodo)
    },
    [actions.DELETED_TODO](state, todoId) {
      let newTodoList = [...state.todoList];
      state.todoList = newTodoList.filter(val => val.id !== todoId)
    },
    [actions.EDIT_TODO](state, todo) {
      let newTodoList = [...state.todoList];
      newTodoList[todo.index].description = todo.description;
      state.todoList = newTodoList
    }
  },
  actions: {
    addTodo({ commit }, newDescription) {
      commit(actions.ADD_TODO, newDescription)
    },
    deleteTodo({ commit }, todoId) {
      commit(actions.DELETED_TODO, todoId.id)
      // console.log(todoId)
    },
    editTodo({ commit }, payload) {
      commit(actions.EDIT_TODO, payload)
    }
  },
  modules: {
  },
  getters: {
    listCompleted: state => {
      return state.todoList.filter(val => val.isCompleted)
    },
    listNotCompleted: state => {
      return state.todoList.filter(val => !val.isCompleted)
    }
  }
})

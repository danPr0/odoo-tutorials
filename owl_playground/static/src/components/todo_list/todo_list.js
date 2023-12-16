/** @odoo-module **/

import { Todo } from '../todo/todo'
import { useAutofocus } from '../../js/utils'

const { Component, useState } = owl

export class TodoList extends Component {
    setup() {
        this.todoList = useState([
            { id: 0, description: 'buy milk', done: false },
            { id: 1, description: 'buy eggs', done: true },
            { id: 2, description: 'buy avocado', done: true },
        ])
        useAutofocus('todoListInput')
    }

    addTodo(ev) {
        const input = ev.target.value
        if (ev.keyCode === 13 && input !== '') {
            this.todoList.push({ id: this.todoList.length, description: input, done: false })
            ev.target.value = ''
        }
    }

    toggleTodo(id) {
        const todo = this.todoList.find(t => t.id === id)
        if (todo) {
            todo.done = !todo.done
        }
    }

    removeTodo(id) {
        const index = this.todoList.findIndex(t => t.id === id)
        if (index >= 0) {
            this.todoList.splice(index, 1)
        }
    }
}

TodoList.template = 'owl_playground.TodoList'
TodoList.components = { Todo }

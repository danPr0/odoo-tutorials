/** @odoo-module **/

import { Component, onMounted, useRef, useState } from '@odoo/owl'
import { Todo } from '../todo/todo'
import { useAutofocus } from '../../js/utils'

export class TodoList extends Component {
    static template = 'owl_playground.todo_list'
    static components = { Todo }

    // inputRef = useRef('input')

    setup() {
        this.todoList = useState([
            { id: 0, description: 'buy milk', done: false },
            { id: 1, description: 'buy eggs', done: true },
            { id: 2, description: 'buy avocado', done: true },
        ])
        useAutofocus('input')
    }

    addTodo(event) {
        let input = event.target.value
        if (event.keyCode === 13 && input !== '') {
            this.todoList.push({id: this.todoList.length, description: input, done: false})
            event.target.value = ''
        }
    }

    toggleState(id) {
        let todo = this.todoList.find(t => t.id === id)
        todo.done = !todo.done
    }

    removeTodo(id) {
        const index = this.todoList.findIndex(t => t.id === id)
        if (index >= 0) {
            this.todoList.splice(index, 1)
        }
    }
}

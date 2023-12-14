/** @odoo-module **/

import { Component } from '@odoo/owl'

export class Todo extends Component {
    static template = 'owl_playground.todo'
    static props = { id: Number, description: String, done: Boolean, toggleState: Function, removeTodo: Function }

    toggleState() {
        this.props.toggleState(this.props.id)
    }

    removeTodo() {
        this.props.removeTodo(this.props.id)
    }
}

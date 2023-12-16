/** @odoo-module **/

const { Component } = owl

export class Todo extends Component {
    handleClick() {
        this.props.toggleState(this.props.id)
    }

    handleRemove() {
        this.props.removeTodo(this.props.id)
    }
}

Todo.template = 'owl_playground.Todo'
Todo.props = {
    id: Number,
    description: String,
    done: Boolean,
    toggleState: Function,
    removeTodo: Function,
}

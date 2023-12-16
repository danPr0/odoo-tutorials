/** @odoo-module **/

const { Component, useState } = owl

export class Counter extends Component {
    setup() {
        this.state = useState({ value: 0 })
    }

    increment() {
        this.state.value++
    }
}

Counter.template = 'owl_playground.Counter'
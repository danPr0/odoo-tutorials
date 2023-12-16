/** @odoo-module **/

import { Counter } from '../counter/counter'
import { TodoList } from '../todo_list/todo_list'
import { Card } from '../card/card'

const { Component } = owl

export class Playground extends Component {
}

Playground.template = 'owl_playground.Playground'
Playground.components = { Counter, TodoList, Card }

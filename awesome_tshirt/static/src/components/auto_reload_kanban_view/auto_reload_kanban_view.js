/** @odoo-module **/

import { registry } from '@web/core/registry'
import { KanbanController } from '@web/views/kanban/kanban_controller'
import { kanbanView } from '@web/views/kanban/kanban_view'
import { useInterval } from '../../js/utils'

export class AutoReloadKanbanController extends KanbanController {
    setup() {
        super.setup()
        useInterval(() => {
            this.model.load()
        }, 30_000)
    }
}

export const AutoReloadKanbanView = {
    ...kanbanView,
    Controller: AutoReloadKanbanController,
}

registry.category('views').add('auto_reload_kanban', AutoReloadKanbanView)

/** @odoo-module **/

import { registry } from '@web/core/registry'
import { kanbanView } from '@web/views/kanban/kanban_view'
import { AutoReloadKanbanController } from '../auto_reload_kanban_view/auto_reload_kanban_view'
import { CustomerList } from '../customer_list/customer_list'

class CustomerKanbanController extends AutoReloadKanbanController {
    setup() {
        super.setup()
    }

    selectCustomer(customer_id, customer_name) {
        this.env.searchModel.setDomainParts({
            customer: {
                domain: [['customer_id', '=', customer_id]],
                facetLabel: customer_name,
            },
        })
    }
}

CustomerKanbanController.template = 'awesome_tshirt.CustomerKanbanView'
CustomerKanbanController.components = { ...AutoReloadKanbanController.components, CustomerList }

export const CustomerKanbanView = {
    ...kanbanView,
    Controller: CustomerKanbanController
}

registry.category('views').add('customer_kanban_view', CustomerKanbanView)

/** @odoo-module **/

import { Domain } from '@web/core/domain'
import { registry } from '@web/core/registry'
import { useService } from '@web/core/utils/hooks'

const { Component, useState } = owl

export class StatSystray extends Component {
    setup() {
        const tshirtService = useService('tshirt_service')
        this.statistics = useState(tshirtService.statistics)
        this.action = useService('action')
    }

    openNewOrders() {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: 'New orders',
            res_model: 'awesome_tshirt.order',
            domain: new Domain("[('state', '=', 'new')]").toList(),
            views: [
                [false, 'list'],
                [false, 'form'],
            ],
        })
    }
}

StatSystray.template = 'awesome_tshirt.StatSystray'

export const systrayItem = { Component: StatSystray }

registry.category('systray').add('awesome_tshirt.statistics', systrayItem, { sequence: 1000 })

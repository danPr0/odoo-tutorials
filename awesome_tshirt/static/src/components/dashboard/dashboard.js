/** @odoo-module **/

import { Domain } from '@web/core/domain'
import { _t } from '@web/core/l10n/translation'
import { registry } from '@web/core/registry'
import { useService } from '@web/core/utils/hooks'
import { sprintf } from '@web/core/utils/strings'
import { Layout } from '@web/search/layout'
import { getDefaultConfig } from '@web/views/view'

import { Card } from '../card/card'
import { CustomerAutocomplete } from '../customer_autocomplete/customer_autocomplete'
import { PieChart } from '../pie_chart/pie_chart'

const { Component, useSubEnv, useState } = owl

export class AwesomeDashboard extends Component {

    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        })

        this.action = useService('action')
        const tshirtService = useService('tshirt_service')
        this.statistics = useState(tshirtService.statistics)

        this.display = {
            controlPanel: { 'top-right': false, 'bottom-right': false },
        }
        this.keyToString = {
            average_quantity: _t('Average amount of t-shirt by order this month'),
            average_time: _t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: _t('Number of cancelled orders this month'),
            nb_new_orders: _t('Number of new orders this month'),
            total_amount: _t('Total amount of new orders this month'),
        }
    }

    openCustomersView() {
        this.action.doAction('base.action_partner_form')
    }

    openOrders(title, domain) {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: title,
            res_model: 'awesome_tshirt.order',
            domain: new Domain(domain).toList(),
            views: [
                [false, 'list'],
                [false, 'form'],
            ],
        })
    }

    openLast7DaysOrders() {
        const domain = "[('create_date', '>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]"
        this.openOrders(_t('Last 7 days orders'), domain)
    }

    openLast7DaysCancelledOrders() {
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state', '=', 'cancelled')]]"
        this.openOrders(_t('Last 7 days cancelled orders'), domain)
    }

    openFilteredBySizeOrders(size) {
        const title = sprintf(_t('Filtered orders by %s size'), size)
        const domain = `[('size', '=', '${size}')]`
        this.openOrders(title, domain)
    }
}

AwesomeDashboard.components = { Layout, Card, PieChart, CustomerAutocomplete }
AwesomeDashboard.template = 'awesome_tshirt.clientaction'

registry.category('lazy_components').add('AwesomeDashboard', AwesomeDashboard)

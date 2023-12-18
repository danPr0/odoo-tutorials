/** @odoo-module **/

import { AutoComplete } from '@web/core/autocomplete/autocomplete'
import { Domain } from '@web/core/domain'
import { _t } from '@web/core/l10n/translation'
import { useService } from '@web/core/utils/hooks'
import { fuzzyLookup } from '@web/core/utils/search'

const { Component } = owl

export class CustomerAutocomplete extends Component {
    setup() {
        this.action = useService('action')
        this.tshirtService = useService('tshirt_service')
    }

    get sources() {
        return [
            {
                placeholder: _t('Loading...'),
                options: this.loadOptionsSources.bind(this),
            },
        ]
    }

    async loadOptionsSources(request) {
        if (!this.customers) {
            const customers = await this.tshirtService.loadCustomers()
            this.customers = customers.map((record) => ({
                label: record.display_name,
                res_id: record.id,
            }))
        }

        if (!request) {
            return this.customers.slice(0, 8)
        }
        const fuzzySearch = fuzzyLookup(request, this.customers, (customer) => customer.label).slice(0, 8)
        if (!fuzzySearch.length) {
            fuzzySearch.push({
                label: this.env._t('No records'),
                unselectable: true,
            })
        }
        return fuzzySearch
    }

    openOrdersFromCustomer(customerId, customerName) {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: `Orders from ${customerName}`,
            res_model: 'awesome_tshirt.order',
            domain: new Domain(`[('customer_id','=', ${customerId})]`).toList(),
            views: [
                [false, 'list'],
                [false, 'form'],
            ],
        })
    }

    onSelect(option) {
        this.openOrdersFromCustomer(option.res_id, option.label)
    }
}

CustomerAutocomplete.template = 'awesome_tshirt.CustomerAutocomplete'
CustomerAutocomplete.components = { AutoComplete }

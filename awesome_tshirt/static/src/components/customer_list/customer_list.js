/** @odoo-module **/

import { Pager } from '@web/core/pager/pager'
import { useService } from '@web/core/utils/hooks'
import { useDebounced } from '@web/core/utils/timing'

const { Component, onWillStart, useState } = owl

export class CustomerList extends Component {
    setup() {
        this.orm = useService('orm')
        this.customers = useState({ data: [] })
        this.state = useState({
            displayActiveCustomers: true,
            searchInput: '',
        })
        this.pager = useState({
            offset: 0,
            limit: 20,
        })

        onWillStart(async () => {
            const { length, records } = await this.loadCustomers()
            this.customers.data = records
            this.pager.total = length
        })
    }

    async handleActiveCustomersChange(ev) {
        this.state.displayActiveCustomers = ev.target.checked
        const { length, records } = await this.loadCustomers()
        this.customers.data = records
        this.pager.total = length
    }

    handleSearchInputChange = useDebounced(async (ev) => {
        this.state.searchInput = ev.target.value
        const { length, records } = await this.loadCustomers()
        this.customers.data = records
        this.pager.total = length
    }, 500)

    async handlePagerUpdate(newState) {
        Object.assign(this.pager, newState)
        const { records } = await this.loadCustomers()
        this.customers.data = records
    }

    loadCustomers() {
        let domain = [['display_name', 'ilike', this.state.searchInput]]
        if (this.state.displayActiveCustomers) {
            domain.push(['has_active_order', '=', true])
        }
        return this.orm.webSearchRead('res.partner', domain, ['display_name'], {
            offset: this.pager.offset,
            limit: this.pager.limit,
        })
    }
}

CustomerList.components = { Pager }
CustomerList.template = 'awesome_tshirt.CustomerList'

CustomerList.props = {
    selectCustomer: Function,
}

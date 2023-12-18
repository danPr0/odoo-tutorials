/** @odoo-module */

import { registry } from '@web/core/registry'
import { memoize } from '@web/core/utils/functions'
import { session } from '@web/session'

const { reactive } = owl

const tshirtService = {
    dependencies: ['rpc', 'orm'],
    async start(env, { rpc, orm }) {
        const statistics = reactive({})

        if (session.statistics) {
            Object.assign(statistics, session.statistics)
        } else {
            Object.assign(statistics, await rpc('/awesome_tshirt/statistics'))
        }

        setInterval(async () => {
            Object.assign(statistics, await rpc('/awesome_tshirt/statistics'))
        }, 60_000)

        async function loadCustomers() {
            return await orm.searchRead('res.partner', [], ['display_name']);
        }

        return {
            statistics,
            loadCustomers: memoize(loadCustomers)
        }
    },
}

registry.category('services').add('tshirt_service', tshirtService)

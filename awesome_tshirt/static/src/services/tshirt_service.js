/** @odoo-module */

import { registry } from '@web/core/registry'
import { session } from '@web/session'
import { memoize } from '@web/core/utils/functions'

const { reactive } = owl

const tshirtService = {
    dependencies: ['rpc'],
    async start(env, { rpc }) {
/*        const statistics = reactive({})

        if (session.statistics) {
            Object.assign(statistics, session.statistics)
        } else {
            Object.assign(statistics, await rpc('/awesome_tshirt/statistics'))
        }

        setInterval(async () => {
            Object.assign(statistics, await rpc('/awesome_tshirt/statistics'))
        }, 60000)*/
        async function loadStatistics() {
            return await rpc('/awesome_tshirt/statistics');
        }

        return { loadStatistics: memoize(loadStatistics) }
    },
}

registry.category('services').add('tshirtService', tshirtService)

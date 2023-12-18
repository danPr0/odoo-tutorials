/** @odoo-module */

import { registry } from '@web/core/registry'

const commandProviderRegistry = registry.category('command_provider')

commandProviderRegistry.add('kitten_command', {
    provide: (env) => {
        const result = []

        const { active, enable, disable } = env.services.kitten_service
        if (active) {
            result.push({
                category: 'kitten',
                name: env._t('Disable kitten mode'),
                action: disable,
            })
        } else {
            result.push({
                category: 'kitten',
                name: env._t('Activate kitten mode'),
                action: enable,
            })
        }

        return result
    },
})

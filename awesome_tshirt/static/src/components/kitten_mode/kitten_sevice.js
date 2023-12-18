/** @odoo-module **/

import { registry } from '@web/core/registry'
import { routeToUrl } from '@web/core/browser/router_service'

export const kittenService = {
    dependencies: ['router'],
    async start(env, { router }) {
        let { search } = router.current
        let active = search.kitten === 1
        if (active) {
            document.documentElement.classList.add('o-kitten-mode')
        }

        return {
            active,
            enable() {
                search.kitten = '1'
                router.redirect(routeToUrl(router.current))
            },
            disable() {
                delete search.kitten
                router.redirect(routeToUrl(router.current))
            },
        }
    }
}

registry.category('services').add('kitten_service', kittenService)

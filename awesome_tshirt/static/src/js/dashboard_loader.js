/** @odoo-module */

import { LazyComponent } from '@web/core/assets'
import { registry } from '@web/core/registry'

const { Component, xml } = owl

class AwesomeDashboardLoader extends Component {}

AwesomeDashboardLoader.components = { LazyComponent }
AwesomeDashboardLoader.template = xml`<LazyComponent bundle="'awesome_tshirt.dashboard'" Component="'AwesomeDashboard'" props="props"/>`

registry.category('actions').add('awesome_tshirt.dashboard', AwesomeDashboardLoader)

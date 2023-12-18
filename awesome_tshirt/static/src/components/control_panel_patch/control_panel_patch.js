/** @odoo-module **/

import { _t } from '@web/core/l10n/translation'
import { ConfirmationDialog } from '@web/core/confirmation_dialog/confirmation_dialog'
import { useService } from '@web/core/utils/hooks'
import { patch } from '@web/core/utils/patch'
import { ControlPanel } from '@web/search/control_panel/control_panel'

patch(ControlPanel.prototype, 'awesome_tshirt.ControlPanelBafienEyes.onClick', {
    setup() {
        this._super(...arguments)
        this.dialogService = useService('dialog')
    },

    openDialog() {
        this.dialogService.add(ConfirmationDialog, {
            body: _t('Bafien is watching you. This interaction is recorded and may be used in legal proceedings if necessary. Do you agree to these terms?'),
        })
    }
})

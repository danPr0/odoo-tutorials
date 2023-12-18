/** @odoo-module **/

import { useCommand } from '@web/core/commands/command_hook'
import { _t } from '@web/core/l10n/translation'
import { registry } from '@web/core/registry'
import { CharField } from '@web/views/fields/char/char_field'

const { Component } = owl

export class ImagePreviewField extends Component {
    setup() {
        if (this.props.value) {
            useCommand(_t('Open image in a new tab'), () => {
                window.open(this.props.value, '_blank')
            })
        }
    }
}

ImagePreviewField.template = 'awesome_tshirt.ImagePreviewField'
ImagePreviewField.components = { CharField }
ImagePreviewField.supportedTypes = ['char']

registry.category('fields').add('image_preview', ImagePreviewField)

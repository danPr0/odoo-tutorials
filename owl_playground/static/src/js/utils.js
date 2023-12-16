/** @odoo-module **/

const { useEffect, useRef } = owl

export function useAutofocus(name) {
    let ref = useRef(name)
    useEffect(
        el => el && el.focus(),
        () => [ref.el],
    )
}

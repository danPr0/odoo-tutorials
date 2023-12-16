/** @odoo-module **/

const { onMounted, onWillUnmount } = owl;

export function useInterval(func, timeout) {
    let intervalId
    onMounted(() => {
        intervalId = setInterval(func, timeout)
    })

    onWillUnmount(() => {
        clearInterval(intervalId)
    })
}

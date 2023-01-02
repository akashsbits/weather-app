import { ICON_MAP } from './iconMap';

function setValue(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode) {
    return `icons/${ICON_MAP.get(iconCode)}.svg`;
}

export { setValue, getIconUrl };

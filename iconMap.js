const ICON_MAP = new Map();

function addMapping(values, icon) {
    values.forEach((value) => {
        ICON_MAP.set(value, icon);
    });
}

addMapping([0, 1], 'sun');
addMapping([2], 'cloud-and-sun');
addMapping([3], 'cloud');
addMapping([45, 48], 'fog');
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], 'rain');
addMapping([71, 73, 75, 77, 85, 86], 'snow');
addMapping([95, 96, 99], 'lightning');

export default ICON_MAP;

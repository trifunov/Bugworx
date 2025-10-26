/**
 * Utility helpers for inspection points
 *
 * statusIntToName: Convert a numeric status code to a human-friendly name.
 * - Accepts a number or numeric-string. If the value is not found in the map,
 *   returns 'Unknown'. You can also pass a custom mapping object as the
 *   second parameter to override or extend the defaults.
 */

const DEFAULT_STATUS_MAP = {
    0: 'Inactive',
    1: 'Active',
    2: 'Removed',
    3: 'New/Installed',
    4: 'Relocated'
};

/**
 * Convert a status integer into a readable status name.
 *
 * @param {number|string} status - Numeric status code (e.g. 0, 1, '2')
 * @param {Object} [map=DEFAULT_STATUS_MAP] - Optional override mapping {int: name}
 * @returns {string} A human friendly status name or 'Unknown' when not found.
 */
export function statusIntToName(status, map = DEFAULT_STATUS_MAP) {
    if (status === null || status === undefined) return 'Unknown';
    const key = Number(status);
    if (Number.isNaN(key)) return 'Unknown';
    return map.hasOwnProperty(key) ? map[key] : 'Unknown';
}

export function statusIntToHtmlBadge(status, map = DEFAULT_STATUS_MAP) {
    const name = statusIntToName(status, map);
    let badgeClass = 'secondary';

    switch (status) {
        case 0:
            badgeClass = 'secondary';
            break;
        case 1:
            badgeClass = 'success';
            break;
        case 2:
            badgeClass = 'danger';
            break;
        case 3:
            badgeClass = 'primary';
            break;
        case 4:
            badgeClass = 'warning';
            break;
        default:
            badgeClass = 'secondary';
    }

    return `<span class="badge bg-${badgeClass}">${name}</span>`;
}

export default {
    statusIntToName,
    statusIntToHtmlBadge,
    DEFAULT_STATUS_MAP
};


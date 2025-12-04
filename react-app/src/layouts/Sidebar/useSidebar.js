import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

// Module routes that should show the ModulesSidebar
const MODULE_ROUTES = [
    '/',
    '/customers',
    '/scheduler',
    '/routing',
    '/reports',
    '/analytics',
    '/inventory',
    '/billing',
    '/notifications'
];

/**
 * useSidebar
 * Encapsulates logic to determine whether the sidebar should be shown
 * based on the current location pathname, and provides a toggle function
 * that mirrors the previous DOM-based sidebar toggle behavior.
 *
 * Returns: { showSidebar: boolean, showModulesSidebar: boolean, showCustomerSidebar: boolean, toggleSidebar: () => void }
 */
export default function useSidebar() {
    const location = useLocation();

    // Check if current path is a module page (exact match or starts with module route)
    const isModulePage = MODULE_ROUTES.some(route => {
        if (route === '/') {
            return location.pathname === '/';
        }
        return location.pathname === route || location.pathname.startsWith(route + '/');
    });

    // Show customer sidebar on customer detail pages (not on customer list)
    const showCustomerSidebar =
        location.pathname.startsWith('/customers/') && location.pathname !== '/customers';

    // Show modules sidebar on module pages, but NOT when customer sidebar is shown
    const showModulesSidebar = isModulePage && !showCustomerSidebar;

    // Show any sidebar
    const showSidebar = showModulesSidebar || showCustomerSidebar;

    const toggleSidebar = useCallback(() => {
        // Mirror the previous imperative class toggling used in Header/MainLayout
        if (typeof document === 'undefined') return;

        document.body.classList.toggle('sidebar-enable');

        const windowWidth = window.innerWidth;
        if (windowWidth >= 992) {
            document.body.classList.toggle('vertical-collpsed');
        } else {
            document.body.classList.remove('vertical-collpsed');
        }
    }, []);

    return { showSidebar, showModulesSidebar, showCustomerSidebar, toggleSidebar };
}

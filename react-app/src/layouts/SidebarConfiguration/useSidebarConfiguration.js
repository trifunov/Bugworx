import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * useSidebar
 * Encapsulates logic to determine whether the sidebar should be shown
 * based on the current location pathname, and provides a toggle function
 * that mirrors the previous DOM-based sidebar toggle behavior.
 *
 * Returns: { showConfigurationSidebar: boolean, toggleSidebar: () => void }
 */
export default function useConfigurationSidebar() {
    const location = useLocation();

    const showConfigurationSidebar =
        location.pathname.startsWith('/configuration');

    const toggleSidebar = useCallback(() => {
        // Mirror the previous imperative class toggling used in Header/MainLayout
        if (typeof document === 'undefined') return;

        document.body.classList.toggle('sidebar-enable');

        const windowWidth = window.innerWidth;
        if (windowWidth >= 992) {
            document.body.classList.toggle('vertical-collapsed');
        } else {
            document.body.classList.remove('vertical-collapsed');
        }
    }, []);

    return { showConfigurationSidebar, toggleSidebar };
}

import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * useSidebar
 * Encapsulates logic to determine whether the sidebar should be shown
 * based on the current location pathname, and provides a toggle function
 * that mirrors the previous DOM-based sidebar toggle behavior.
 *
 * Returns: { showSidebar: boolean, toggleSidebar: () => void }
 */
export default function useSidebar() {
    const location = useLocation();

    const showSidebar =
        location.pathname.startsWith('/accounts/') && location.pathname !== '/accounts';

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

    return { showSidebar, toggleSidebar };
}

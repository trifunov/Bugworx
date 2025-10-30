import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSidebarMenu = (menuSelector = '#side-menu') => {
  const location = useLocation();

  useEffect(() => {
    // Initialize MetisMenu
    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.metisMenu) {
      try {
        window.jQuery(menuSelector).metisMenu();
      } catch (e) {
        // ignore initialization errors
      }
    }

    // Initialize Waves
    if (window.Waves && typeof window.Waves.init === 'function') {
      window.Waves.init();
    }
  }, [menuSelector]);

  useEffect(() => {
    const activateMenuItems = () => {
      const links = document.querySelectorAll(`${menuSelector} a`);
      links.forEach(link => {
        link.classList.remove('active');
        const parent = link.parentElement;
        if (parent) parent.classList.remove('mm-active');
      });

      const currentPath = location.pathname;
      const matchingLink = Array.from(links).find(link => {
        // anchor href is used in DOM; compare pathname
        const href = link.getAttribute('href');
        return href === currentPath;
      });

      if (matchingLink) {
        matchingLink.classList.add('active');
        let parent = matchingLink.parentElement;
        if (parent) parent.classList.add('mm-active');

        // walk up and set mm-active on ancestor <li>s (if needed by your menu)
        let ancestor = parent;
        while (ancestor) {
          if (ancestor.tagName === 'LI') ancestor.classList.add('mm-active');
          ancestor = ancestor.parentElement;
        }
      }
    };

    activateMenuItems();
  }, [location, menuSelector]);
};

export default useSidebarMenu;
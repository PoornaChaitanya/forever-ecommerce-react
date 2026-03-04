import { useEffect } from "react";

/**
 * Sets the browser tab title for a page, resetting to "Forever" on unmount.
 * @param {string} title - The page-specific title to set.
 */
const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} — Forever` : "Forever";
    return () => {
      document.title = "Forever";
    };
  }, [title]);
};

export default usePageTitle;

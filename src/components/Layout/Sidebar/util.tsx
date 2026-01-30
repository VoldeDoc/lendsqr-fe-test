import { IconContext } from "react-icons";
import type { Dispatch, SetStateAction } from "react";

   export const toggleSection = (
      sectionName: string,
      setOpenSections: Dispatch<SetStateAction<Record<string, boolean>>>
    ) => {
      setOpenSections(prev => ({
        ...prev,
        [sectionName]: !prev[sectionName]
      }));
    };

   export const handleMenuClick = (
      path: string | undefined,
      setActiveMenu: Dispatch<SetStateAction<string>>
    ) => {
      if (path && path !== "#") {
        setActiveMenu(path);
      }
    };

   export const renderIcon = (icon?: React.ComponentType, iconSrc?: string, className?: string) => {
      if (iconSrc) {
        return <img src={iconSrc} alt="" className={className} />;
      }
      if (icon) {
        const Icon = icon;
        return (
          <IconContext.Provider value={{ className }}>
            {Icon && <Icon />}
          </IconContext.Provider>
        );
      }
      return null;
    };
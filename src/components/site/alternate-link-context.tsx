'use client';

import * as React from 'react';
import type { Locale } from '@/lib/i18n/config';

/**
 * Maps each locale to the pathname that the lang-switcher should navigate to.
 * When a page (e.g. article detail) knows the translated URL differs from
 * a simple locale swap, it sets overrides here so the LangSwitcher uses
 * the correct href.
 */
type AlternateLinks = Partial<Record<Locale, string>>;

interface AlternateLinkContextValue {
  links: AlternateLinks;
  setLinks: (links: AlternateLinks) => void;
}

const AlternateLinkContext = React.createContext<AlternateLinkContextValue>({
  links: {},
  setLinks: () => {}
});

export function AlternateLinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = React.useState<AlternateLinks>({});
  const value = React.useMemo(() => ({ links, setLinks }), [links]);
  return (
    <AlternateLinkContext.Provider value={value}>
      {children}
    </AlternateLinkContext.Provider>
  );
}

export function useAlternateLinks() {
  return React.useContext(AlternateLinkContext);
}

/**
 * Render this component inside a page to set alternate locale links for the
 * LangSwitcher in the header. The links are cleared when the component unmounts
 * (i.e. when the user navigates away from the page).
 */
export function SetAlternateLinks({ links }: { links: AlternateLinks }) {
  const { setLinks } = useAlternateLinks();

  React.useEffect(() => {
    setLinks(links);
    return () => setLinks({});
  }, [links, setLinks]);

  return null;
}

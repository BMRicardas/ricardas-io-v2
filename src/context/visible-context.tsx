import { createContext, FC, ReactNode, useMemo, useState } from 'react';

export interface ContextProps {
  visibleSection: string;
  visibleHandler: (id: string) => void;
}

interface Props {
  children: ReactNode;
}

export const VisibleContext = createContext<ContextProps | null>(null);

export const VisibleContextProvider: FC<Props> = ({ children }) => {
  const [visibleSection, setVisibleSection] = useState('');

  const visibleHandler = (id: string) => {
    setVisibleSection(id);
  };

  const value = useMemo<ContextProps>(
    () => ({
      visibleSection,
      visibleHandler,
    }),
    [visibleSection]
  );

  return (
    <VisibleContext.Provider value={value}>{children}</VisibleContext.Provider>
  );
};

import { createContext, FC, ReactNode, useState } from 'react';

export interface ContextProps {
  visible: string;
  visibleHandler: () => void;
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

  return (
    <VisibleContext.Provider
      value={{
        visible: visibleSection,
        visibleHandler,
      }}
    >
      {children}
    </VisibleContext.Provider>
  );
};

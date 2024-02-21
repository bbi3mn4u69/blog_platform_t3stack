import { createContext, useState, ReactNode, useContext } from "react";

interface FloatingActionProps {
  createImage: boolean;
  setCreateImage: React.Dispatch<React.SetStateAction<boolean>>;
  createContent: boolean;
  setCreateContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FloatingActionContext = createContext<
  FloatingActionProps | undefined
>(undefined);

const FloatingActionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [createImage, setCreateImage] = useState<boolean>(false);
  const [createContent, setCreateContent] = useState<boolean>(false);

  const value = {
    createImage,
    setCreateImage,
    createContent,
    setCreateContent,
  };
  return (
    <FloatingActionContext.Provider value={value}>
      {children}
    </FloatingActionContext.Provider>
  );
};

export default FloatingActionContextProvider;

export const useFloatingActionContext = () => {
  const context = useContext(FloatingActionContext);
  if (!context) {
    throw new Error("error in floating action context");
  }
  return context;
};

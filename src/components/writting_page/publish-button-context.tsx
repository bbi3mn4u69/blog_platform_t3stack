import { createContext, ReactNode, useContext, useState } from "react";

interface PublishButtonContextProps {
  submit: boolean;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PublishButtonContext = createContext<PublishButtonContextProps | undefined>(undefined);


const PublishButtonContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [submit, setSubmit] = useState<boolean>(false);
  const handleSubmit = () => {
    setSubmit(true);
  };
  const value = {
    submit,
    setSubmit: handleSubmit,
  };
  return (
    <PublishButtonContext.Provider value={value}>
      {children}
    </PublishButtonContext.Provider>
  );
};

export default PublishButtonContextProvider;

export const usePublishButtonContext = () => {
  const context = useContext(PublishButtonContext);
  if (!context) {
    throw new Error("usePublishButtonContext must be used within a PublishButtonContextProvider");
  }
  return context;
};

import { createContext } from "react";
import { useState } from "react";

export const CredentialContext = createContext();

//to diplay the name of the user on the side bar
export const CredentialProvider = (props) => {
  const [credential, setCredentials] = useState(" ");

  return (
    <CredentialContext.Provider value={[credential, setCredentials]}>
      {props.children}
    </CredentialContext.Provider>
  );
};

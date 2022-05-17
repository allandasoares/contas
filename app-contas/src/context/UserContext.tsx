import { createContext, useContext, useState } from 'react';

const UserContext = createContext<any>(null);

const initialValues = {
    name: "",
    profile: ""
};

export default function UserProvider({ children }) {
  const [dados, setDados] = useState(initialValues);

  return (
    <>
      <UserContext.Provider value={[ dados, setDados ]}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export function useProfile() {
  return useContext(UserContext);
}

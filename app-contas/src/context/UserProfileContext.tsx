import React, { createContext, useContext, useState } from "react";

const UserProfileContext = createContext(null);

const dataUser = {
  name: "",
  profile: "",
};

export default function UserProfileProvider({ children }) {
  const [dataProfile, setDataProfile] = useState(dataUser);

  return (
    <>
      <UserProfileContext.Provider value={{ dataProfile, setDataProfile }}>
        {children}
      </UserProfileContext.Provider>
    </>
  );
}

export function useProfileContext() {
  return useContext(UserProfileContext);
}


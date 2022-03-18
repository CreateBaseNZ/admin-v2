import axios from 'axios';
import React, { useEffect, useState } from 'react';

type IData = {
  status: string;
  content: Array<any>;
};

const ProfilesContext = React.createContext<any>({
  profiles: [],
});

export const ProfilesContextProvider = (props: any) => {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    console.log(`Fetching Profiles at: ${new Date().toString()}`);
    axios
      .post<IData>('/api/fetch-profiles')
      .then((data) => {
        if (JSON.stringify(data.data.content) !== JSON.stringify(profiles)) {
          setProfiles(data.data.content);
        }
      })
      .catch((error) => console.log(error));
    const fetchProfileInterval = setInterval(() => {
      console.log(`Fetching Profiles at: ${new Date().toString()}`);
      axios
        .post<IData>('/api/fetch-profiles')
        .then((data) => {
          if (JSON.stringify(data.data.content) !== JSON.stringify(profiles)) {
            setProfiles(data.data.content);
          }
        })
        .catch((error) => console.log(error));
    }, 1000 * 60);

    return () => {
      clearInterval(fetchProfileInterval);
    };
  }, []);

  return (
    <ProfilesContext.Provider value={{ profiles }}>
      {props.children}
    </ProfilesContext.Provider>
  );
};

export default ProfilesContext;

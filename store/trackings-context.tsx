import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ProfilesContext from './profiles-context';

type IData = {
  status: string;
  content: Array<any>;
};

const TrackingsContext = React.createContext<any>({
  trackings: [],
});

export const TrackingsContextProvider = (props: any) => {
  const [trackings, setTrackings] = useState<any[]>([]);
  const { profiles } = useContext(ProfilesContext);

  useEffect(() => {
    if (!profiles.length) return;
    axios
      .post<IData>('/api/fetch-trackings')
      .then((data) => {
        const newTrackings = data.data.content
          .filter((tracking: any) =>
            profiles.find((profile: any) => tracking.profile === profile._id)
          )
          .map((tracking: any) => {
            if (tracking.timestamp.toString().length === 16) {
              tracking.timestamp /= 1000;
            }
            return tracking;
          });
        if (JSON.stringify(newTrackings) !== JSON.stringify(trackings)) {
          setTrackings(newTrackings);
        }
      })
      .catch((error) => console.log(error));
  }, [profiles]);

  return (
    <TrackingsContext.Provider value={{ trackings }}>
      {props.children}
    </TrackingsContext.Provider>
  );
};

export default TrackingsContext;

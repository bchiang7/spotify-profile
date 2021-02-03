import React, { useState, useEffect } from 'react';
import { getRecentlyPlayed } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader';
import TrackItem from './TrackItem';

import styled from 'styled-components/macro';
import { Main } from '../styles';

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    }
    catchErrors(fetchData());
  }, []);

  return (
    <Main>
      <h2>Recently Played Tracks</h2>
      <TracksContainer>
        {recentlyPlayed ? (
          recentlyPlayed.items.map(({ track }, i) => <TrackItem track={track} key={i} />)
        ) : (
          <Loader />
        )}
      </TracksContainer>
    </Main>
  );
};

export default RecentlyPlayed;

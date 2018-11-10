import React from 'react';
import styled from 'styled-components/macro';
import { theme, mixins } from '../styles';

const Container = styled.footer`
  ${mixins.flexBetween};
  background-color: ${theme.colors.darkGrey};
  position: fixed;
  width: 100%;
  height: ${theme.playerHeight};
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  min-width: 620px;
  border-top: 1px solid #000;
  padding: 16px;
  & > * {
    height: 100%;
  }
`;
const PlayerLeft = styled.div`
  display: flex;
  align-items: center;
`;
const CoverArt = styled.span`
  width: ${theme.playerAlbumWidth};
  display: inline-block;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;
const TrackInfo = styled.div`
  margin: 0 14px;
`;
const TrackTitle = styled.a`
  ${mixins.overflowEllipsis};
  display: block;
  font-size: ${theme.fontSizes.sm};
  line-height: 20px;
  letter-spacing: 0.015em;
  font-weight: 600;
`;
const ArtistName = styled.span`
  ${mixins.overflowEllipsis};
  display: block;
  font-size: ${theme.fontSizes.xs};
  line-height: 16px;
  letter-spacing: 0.015em;
  color: ${theme.colors.lightestGrey};
`;
const PlayerCenter = styled.div`
  ${mixins.flexBetween};
  flex-direction: column;
  width: ${theme.playerControlsWidth};
  max-width: ${theme.playerControlsWidth};
  height: 100%;
`;
const PlayerControls = styled.div`
  ${mixins.flexCenter};
`;
const ControlButton = styled.button`
  color: ${theme.colors.lightestGrey};
  background-color: transparent;
  &:hover,
  &:focus {
    color: ${theme.colors.white};
  }
`;
const PlayButton = styled(ControlButton)`
  width: ${theme.playerVolumeButtonWidth};
  height: ${theme.playerVolumeButtonWidth};
  font-size: 12px;
  border-radius: 100%;
  margin: 0 ${theme.spacing.base};
  font-size: 28px;
  padding: 0;
`;
const PlaybackBar = styled.div`
  ${mixins.flexBetween};
  width: 100%;
`;
const ProgressTime = styled.span`
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.015em;
  min-width: 40px;
  text-align: center;
`;
const ProgressBar = styled.div`
  width: 100%;
  height: ${theme.playerVolumeBarHeight};
`;
const ProgressBarBackground = styled.div`
  background-color: ${theme.colors.grey};
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 2px;
`;
const ProgressBarForeground = styled.div`
  background-color: ${theme.colors.lightestGrey};
  position: absolute;
  width: 40%;
  height: 100%;
  border-radius: 2px;
`;
const PlayerRight = styled.div`
  display: flex;
  align-items: center;
`;
const Volume = styled.div`
  display: flex;
  align-items: center;
`;
const VolumeButton = styled.button`
  width: ${theme.playerVolumeButtonWidth};
  height: ${theme.playerVolumeButtonWidth};
  background-color: transparent;
  color: ${theme.colors.lightestGrey};
  font-size: 14px;
  &:hover,
  &:focus {
    color: ${theme.colors.white};
  }
`;
const VolumeBar = styled.div`
  width: ${theme.playerVolumeBarWidth};
  height: ${theme.playerVolumeBarHeight};
`;
const VolumeBarBackground = styled.div`
  background-color: ${theme.colors.grey};
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 2px;
`;
const VolumeBarForeground = styled.div`
  background-color: ${theme.colors.lightestGrey};
  position: absolute;
  width: 40%;
  height: 100%;
  border-radius: 2px;
`;

const Player = () => (
  <Container>
    <PlayerLeft>
      <CoverArt>
        <img
          src="https://i.scdn.co/image/10b76e6b992fd32846c6de9f7416f682f83ad6db"
          alt="Cover Art"
        />
      </CoverArt>
      <TrackInfo>
        <TrackTitle href="#">Alejandro</TrackTitle>
        <ArtistName>Lady Gaga</ArtistName>
      </TrackInfo>
    </PlayerLeft>
    <PlayerCenter>
      <PlayerControls>
        <ControlButton>
          <i className="fas fa-step-backward" />
        </ControlButton>
        <PlayButton>
          <i className="far fa-play-circle" />
          {/* <i class="far fa-pause-circle"></i> */}
        </PlayButton>
        <ControlButton>
          <i className="fas fa-step-forward" />
        </ControlButton>
      </PlayerControls>
      <PlaybackBar>
        <ProgressTime>0:00</ProgressTime>
        <ProgressBar>
          <ProgressBarBackground>
            <ProgressBarForeground />
          </ProgressBarBackground>
        </ProgressBar>
        <ProgressTime>5:00</ProgressTime>
      </PlaybackBar>
    </PlayerCenter>
    <PlayerRight>
      <Volume>
        <VolumeButton>
          <i className="fas fa-volume-up" />
          {/* <i class="fas fa-volume-off"></i> */}
        </VolumeButton>
        <VolumeBar>
          <VolumeBarBackground>
            <VolumeBarForeground />
          </VolumeBarBackground>
        </VolumeBar>
      </Volume>
    </PlayerRight>
  </Container>
);

export default Player;

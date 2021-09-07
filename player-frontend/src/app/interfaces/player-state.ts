import { Song } from './song';

export interface PlayerState {
  playerShown: boolean;
  showFullscreenSection: boolean;
  trackPlaying: boolean;
  nowPlaying?: Song;
  queue?: Song[];
  shuffleMode?: boolean;
  shufflePlayed?: Song[];
  previouslyPlayed?: Song[];
  nowPlayingDuration?: number;
  nowPlayingPosition?: number;
  nowPlayingIndex?: number;
  howlerQueue: any[];
  loop?: boolean;
  shuffle?: boolean;
  shuffleIndex?: number;
}

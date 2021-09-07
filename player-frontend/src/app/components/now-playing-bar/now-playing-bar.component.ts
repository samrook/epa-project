import { Component, OnInit } from '@angular/core';
import { PlayerState } from 'src/app/interfaces/player-state';
import { PlayerService } from '../../services/player.service';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-now-playing-bar',
  templateUrl: './now-playing-bar.component.html',
  styleUrls: ['./now-playing-bar.component.scss'],
})
export class NowPlayingBarComponent implements OnInit {

  playerShown = false;
  trackPlaying = false;
  nowPlaying: Song = null;
  nowPlayingDuration = 0;
  nowPlayingPosition = 0;
  shuffleModeEnabled = false;
  loopModeEnabled = false;

  Math: Math;

  constructor(
    private player: PlayerService,
  ) {
    this.player.state$.subscribe((state: PlayerState) => {
      this.playerShown = state.playerShown;
      this.trackPlaying = state.trackPlaying;
      this.nowPlaying = state?.nowPlaying;
      this.nowPlayingDuration = state?.nowPlayingDuration;
      this.nowPlayingPosition = state?.nowPlayingPosition;
      this.shuffleModeEnabled = state?.shuffle;
      this.loopModeEnabled = state?.loop;
    });

    this.Math = Math;
  }

  ngOnInit() {}

  pauseTrack() {
    this.player.pauseTrack();
  }

  resumeTrack() {
    this.player.resumeTrack();
  }

  showFullscreenPlayer() {
    this.player.showFullscreenPlayer();
  }

  hideFullscreenPlayer() {
    this.player.hideFullscreenPlayer();
  }

  togglePlayer() {
    this.player.togglePlayer();
  }

  nextTrack() {
    this.player.nextTrack();
  }

  previousTrack() {
    this.player.previousTrack();
  }

  rangeValueChange(element: any) {
    this.player.setPosition(element.value);
  }

  toggleShuffleMode() {
    this.player.toggleShuffleMode();
  }

  toggleLoopMode() {
    this.player.toggleLoopMode();
  }
}

import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { PlayerState } from '../../interfaces/player-state';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-fullscreen-player',
  templateUrl: './fullscreen-player.component.html',
  styleUrls: ['./fullscreen-player.component.scss'],
})
export class FullscreenPlayerComponent implements OnInit {
  nowPlaying: Song = null;
  showFullscreenSection = false;
  trackPlaying = false;

  nowPlayingDuration = 0;
  nowPlayingPosition = 0;

  shuffleModeEnabled = false;
  loopModeEnabled = false;

  Math: any;

  constructor(
    private player: PlayerService,
  ) {
    this.Math = Math;

    this.player.state$.subscribe((state: PlayerState) => {
      this.showFullscreenSection = state.showFullscreenSection;
      this.nowPlaying = state.nowPlaying;
      this.trackPlaying = state.trackPlaying;

      this.nowPlayingDuration = state?.nowPlayingDuration;
      this.nowPlayingPosition = state?.nowPlayingPosition;
      // console.log({nowPlaying: this.nowPlaying});

      this.shuffleModeEnabled = state?.shuffle;
      this.loopModeEnabled = state?.loop;
    });
  }

  ngOnInit() {}

  showFullscreenPlayer() {
    this.player.showFullscreenPlayer();
  }

  hideFullscreenPlayer() {
    this.player.hideFullscreenPlayer();
  }

  pauseTrack() {
    this.player.pauseTrack();
  }

  resumeTrack() {
    this.player.resumeTrack();
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

  toggleLoopMode() {
    this.player.toggleLoopMode();
  }

  toggleShuffleMode() {
    this.player.toggleShuffleMode();
  }
}

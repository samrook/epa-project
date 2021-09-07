import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';
import { PlayerService } from './services/player.service';
import { NowPlayingBarComponent } from './components/now-playing-bar/now-playing-bar.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FullscreenPlayerComponent } from './components/fullscreen-player/fullscreen-player.component';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  declarations: [AppComponent, NowPlayingBarComponent, NavigationComponent, FullscreenPlayerComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SharedModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ApiService, PlayerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

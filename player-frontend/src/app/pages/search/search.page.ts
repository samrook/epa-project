import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../interfaces/song';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, ViewWillEnter {

  results: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private loadingController: LoadingController,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.searchService.state$.subscribe((state: any) => {
      this.results = state.searchResults;
    });

    this.route.params.subscribe(async (routeParams) => {
      const query = routeParams.query;

      const loading = await this.loadingController.create({
        message: 'Your search results are loading.',
        duration: 0
      });

      loading.present();

      if (this.searchService.isSearchBarShown() === false) {
        this.searchService.setSearchQuery(query);
        this.searchService.showSearchBar();
      }

      await this.searchService.getSearchResults(query);

      loading.dismiss();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { NavigationState } from '../../interfaces/navigation-state';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  pageTitle = 'Rebmem Music Player';

  showFullscreenSection: boolean;
  sideMenuShown: boolean;
  attachOutsideOnClick: boolean;

  searchShown = false;

  searchQuery: string;
  searchQueryTimeout: any = null;

  constructor(
    private navigation: NavigationService,
    private router: Router,
    private route: ActivatedRoute,
    private navController: NavController,
    private location: Location,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.navigation.state$.subscribe((state: NavigationState) => {
      this.sideMenuShown = state.sideMenuShown;
      this.attachOutsideOnClick = state.attachOutsideOnClick;
      this.pageTitle = state.pageTitle || this.pageTitle;
    });

    this.searchService.state$.subscribe((state) => {
      this.searchQuery = state.searchQuery;
      this.searchShown = state.searchShown;
    });
  }

  openSideMenu() {
    this.navigation.openSideMenu();
  }

  closeSideMenu() {
    this.navigation.closeSideMenu();
  }

  closeSearchBar() {
    console.log('search hidden');
    this.searchShown = false;
  }

  openSearchBar() {
    console.log('search shown');
    this.searchShown = true;
  }

  handleSearchNavigation() {
    if (this.searchQueryTimeout !== null) {
      clearTimeout(this.searchQueryTimeout);
    }

    this.searchQueryTimeout = setTimeout(() => {
      this.doSearch();
    }, 500);
    console.log({query: this.searchQuery});
  }

  doSearch() {
    if (this.searchQueryTimeout !== null) {
      clearTimeout(this.searchQueryTimeout);
    }

    if (typeof this.searchQuery === 'string' && this.searchQuery !== '') {
      if (this.router.url.indexOf('search/') === -1) {
        this.navController.navigateForward('/search/' + this.searchQuery);
      } else {
        this.location.replaceState('/search/' + this.searchQuery);
        this.searchService.getSearchResults(this.searchQuery);
      }
    }
  }
}

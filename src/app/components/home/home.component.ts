import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games: Array<Game> = []; // Inizializza come array vuoto
  public filteredGames: Array<Game> = []; // Nuova proprietà per giochi filtrati
  private routeSub: Subscription | undefined;
  private gameSub: Subscription | undefined;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        this.filteredGames = gameList.results; // Inizializza i giochi filtrati con tutti i giochi
      });
  }

  filterGames(searchTerm: string): void {
    if (searchTerm) {
      this.filteredGames = this.games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredGames = [...this.games]; // Reset della lista se la barra di ricerca è vuota
    }
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}

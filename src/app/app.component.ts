import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public showHeader: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ){}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.route))
      .pipe(
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )
      .pipe(switchMap((route) => route.data))
      .subscribe((event) => {
        this.title.setTitle(event.title);
        this.showHeader = event.showHeader;
      });
  }

}

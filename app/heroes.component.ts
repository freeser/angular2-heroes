import { Component ,OnInit} from '@angular/core';
import { Router }           from '@angular/router';

import { Hero }             from './hero';
import { HeroService }      from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: '../app/heroes.component.html',
    styleUrls: ['../app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
    selectedHero: Hero;
    heroes: Hero[];
    //title = 'Tour of Heroes';

    constructor(
        private router: Router,
        private heroService: HeroService
    ) { }

    onSelect(hero:Hero):void{
        this.selectedHero = hero;
    }

    getHeroes(): void {
        //this.heroes = this.heroService.getHeroes();
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
            this.heroes.push(hero);
            this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }


    ngOnInit(): void {
        this.getHeroes();
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}


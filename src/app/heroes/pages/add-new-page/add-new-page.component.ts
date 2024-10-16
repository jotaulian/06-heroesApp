import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'heroes-add-new-page',
  templateUrl: './add-new-page.component.html',
  styles: ``
})
export class AddNewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
    ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ){}

  // OnInit
   ngOnInit(): void {
    // Solo cargamos el heroe si estamos editando:
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({id}) =>this.heroesService.getHeroById(id))
    ).subscribe(hero=>{
        if(!hero) return this.router.navigate(['/heroes/list']);

        // Asignamos los valores del heroe al formulario
        this.heroForm.reset(hero);

        return;
    });
  }

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void{
    if(this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero).subscribe(hero => {
        this.showSnackBar(`${hero.superhero} has been updated!`)
      })
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe(hero =>{
      this.showSnackBar(`${hero.superhero} has been created!`)
      this.router.navigate(['heroes/edit', hero.id])
    })
  }

  onDeleteHero():void{
    if(!this.currentHero.id){
      this.showSnackBar('Hero id is required')
      throw Error('Hero id is required')
      }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: this.currentHero})

    dialogRef.afterClosed().subscribe(result=>{
      if(!result) return;

      this.heroesService.deleteHeroById(this.currentHero.id).subscribe(wasDeleted =>{
        if(wasDeleted){
          this.router.navigate(['/heroes/list']);
        }
      });
    })
  }

  showSnackBar(message: string):void{
    this.snackbar.open(message,'Done',{duration:2500})
  }
}

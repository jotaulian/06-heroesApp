import { Component } from '@angular/core';

@Component({
  selector: 'heroes-add-new-page',
  templateUrl: './add-new-page.component.html',
  styles: ``
})
export class AddNewPageComponent {
  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
    ]
}

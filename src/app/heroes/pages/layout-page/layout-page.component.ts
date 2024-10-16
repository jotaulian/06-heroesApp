import { Component } from '@angular/core';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidenavItems = [
    {label:'List', icon:'label', url:'./list'},
    {label:'Add new', icon:'add', url:'./add-new-hero'},
    {label:'Search', icon:'search', url:'./search'},
  ]
}

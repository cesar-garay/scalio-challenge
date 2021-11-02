import { Component, Input } from '@angular/core';
import { SearchUserItem } from 'src/app/services/search.interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  @Input('user') user!: SearchUserItem;

}

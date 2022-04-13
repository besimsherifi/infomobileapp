import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchText;
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  changeFilter(event) {
    console.log(event);
    this.searchService.searchTextt.next(event.target.value);
  }
}

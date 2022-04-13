import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor(private lokacioni: Location) {}

  ngOnInit(): void {}

  backClicked() {
    this.lokacioni.back();
  }
}

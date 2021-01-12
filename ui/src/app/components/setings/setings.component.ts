import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-setings',
  templateUrl: './setings.component.html',
  styleUrls: ['./setings.component.css']
})
export class SetingsComponent implements OnInit {

  constructor(private lokacioni: Location) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  backClicked() {
    this.lokacioni.back();
  }
}

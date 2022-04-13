import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchTextt = new BehaviorSubject('');
  selectedLanguage = new BehaviorSubject('');
  constructor() {}

  // setLanguage(value: string){
  //   this.selectedLanguage.subscribe((val) => { 
  //     value = val; 
  //   });
  //   if(localStorage.getItem('selectedLanguage') == null) {
  //     value = 'al';
  //   }else {
  //     value = localStorage.getItem('selectedLanguage');
  //   }
  // }
}

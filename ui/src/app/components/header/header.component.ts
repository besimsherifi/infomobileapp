import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/data.service';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  selectedLanguage: string;
  
  constructor(private search: SearchService,private translate: TranslateService ) {
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('selectedLanguage') == null) {
      this.selectedLanguage = 'al';
    }else {
      this.selectedLanguage = localStorage.getItem('selectedLanguage');
    }
  }

  

  changeLanguage(event) {
    this.search.selectedLanguage.next(event.target.value);
    localStorage.setItem('selectedLanguage', event.target.value);
    this.selectedLanguage = event.target.value;
    this.translate.use(this.selectedLanguage);
    this.translate.setDefaultLang(this.selectedLanguage)
    
  }

}

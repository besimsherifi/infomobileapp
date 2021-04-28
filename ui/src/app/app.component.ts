import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'ui';
  selecteLang = localStorage.getItem('selectedLanguage')
  
  constructor(private translate: TranslateService) {
    if (this.selecteLang) {
      this.translate.use(this.selecteLang);
      // this.translate.setDefaultLang(this.selecteLang);
    }else{
      this.translate.use('al');
      this.translate.setDefaultLang('al');
    }
    

  }
}

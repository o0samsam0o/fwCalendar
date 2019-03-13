import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '../shared/languages';
import {DateAdapter} from '@angular/material';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() isLogin = false;
  translate: TranslateService;
  languages = Language;
  selectedLanguage = this.languages[0].abr;

  constructor(private _translate: TranslateService,
              private adapter: DateAdapter<any>,
              private authService: AuthService) {

    this.translate = _translate;
    this.translate.use(this.selectedLanguage);
  }

  ngOnInit() {
  }

  changeLanguage(value): void {
    this.translate.use(value);
    this.adapter.setLocale(value);
  }

  logout(): void {
    this.authService.logout();
  }
}

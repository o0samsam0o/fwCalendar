import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  loginForm: FormGroup;
  isLoading: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  
  login() {
    this.isLoading = true;
    const val = this.loginForm.value;
    const hashed_pwd = Md5.hashStr(val.password + val.username);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (val.username && val.password) {
      this.authService.login(val.username, hashed_pwd)
        .subscribe(
          () => {
            this.isLoading = false;
            console.log('User is logged in');
            this.router.navigateByUrl(this.returnUrl);
          },
          error => {
            this.loginForm.hasError('required');
          }
        );
    }
  }

}

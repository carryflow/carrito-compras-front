import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public status: string
  public identity;
  public token;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
  }

  ngOnInit() {
  }

  onSubmit() {
    // Loguear al usuario y conseguir sus datos
    this._userService.singup(this.user).subscribe(
      response => {
        this.identity = response.user;
        console.log(this.identity);
        if (!this.identity || !this.identity._id) {
          this.status = 'error'
        } else {
          this.status = 'success'
          // persistir datos del usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));
          // conseguir el token
          this.gettoken()
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  gettoken() {
    this._userService.singup(this.user, 'true').subscribe(
      response => {
        this.token = response.token;
        console.log(this.token);
        if (this.token.length <= 0) {
          this.status = 'error'
        } else {
          this.status = 'success'
          // persistir token del usuario
          localStorage.setItem('token', JSON.stringify(this.token));
          // conseguir los contadores o estadisticas del usuario
          this._router.navigate(['/']);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );

  }

}

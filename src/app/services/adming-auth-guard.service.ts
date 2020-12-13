import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmingAuthGuardService implements CanActivate {


  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }


  canActivate(): Observable<boolean> {
    return this.auth.user$
    .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
    .pipe(map(appUser => appUser.isAdmin))
  }
}


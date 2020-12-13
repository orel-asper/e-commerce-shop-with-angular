import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.user$ = auth.authState
  }

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['/products'])
        this.auth.authState.subscribe(user => this.userService.save(user))
      })
  }

  logout() {
    this.auth.signOut()
      .then(() => { this.router.navigate(['/login']) })
  }
}

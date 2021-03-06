import{first}from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { auth } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Observable, of } from 'rxjs';
//import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  //public user$?: Observable<any>;

  constructor(public afAuth: AngularFireAuth) {
  }

  async loginGoogle() {
    try {
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    } catch (error) {
      return console.log(error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    const verif=await this.afAuth.currentUser;
    try{
      if(verif)
      return (verif).sendEmailVerification();
    }catch(error){
      return console.log(error);
    }
  }

  async login(email:string, password:string){
    try{
      const result=await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    }catch(error){
      return console.log(error);
    }
  }

  async register(email: string, password: string) {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser(): Promise<any>{
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  //Obtener Nombre y foto de Usuario
  getUserAuth(){
    return this.afAuth.authState;
  }

}

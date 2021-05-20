import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { initSupabase } from './utils/initSupabase'
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //initialise supabase api, user and session
  supabase = createClient(initSupabase.url, initSupabase.key);
  user = this.supabase.auth.user();
  session = this.supabase.auth.session();

  constructor(private router: Router) {}
  
  async login(email: string, passw: string) {
    const { user, session, error } = await this.supabase.auth.signIn({
      email: email,
      password: passw
    });
    if (error)
    {
      alert(error.message);
    }
    else
    {
      this.updateSession(user, session);
    }
  }
  
  async register(email: string, passw: string) {
    const { user, session, error } = await this.supabase.auth.signUp({
      email: email,
      password: passw
    });
    if (error)
    {
      alert(error.message);
    }
    else
    {
      this.updateSession(user, session);
    }
  }
  
  async logout() {
    const { error } = await this.supabase.auth.signOut()
    if (error)
    {
      alert(error.message);
    }
    else
    {
      this.updateSession(null, null);
    }
  }
  
  private updateSession(user: any, session: any) {
    this.user = user;
    this.session = session;
    this.router.navigateByUrl('home');
  }
}

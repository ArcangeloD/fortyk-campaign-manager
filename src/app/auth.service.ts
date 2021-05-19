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
      this.user = user;
      this.session = session;
      this.router.navigateByUrl('home');
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
      this.user = user;
      this.session = session;
      this.router.navigateByUrl('home');
    }
  }
  
  async logout() {
    this.supabase.auth.signOut()
    this.user = this.supabase.auth.user();
    this.session = this.supabase.auth.session();
    this.router.navigateByUrl('home');
  }
}

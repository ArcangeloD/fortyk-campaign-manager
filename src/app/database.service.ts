import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { initSupabase } from './utils/initSupabase'
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  //initialise supabase api
  supabase = createClient(initSupabase.url, initSupabase.key);
  
  //Date and time
  now = new Date(Date.now()+(1000*60*(-(new Date()).getTimezoneOffset()))).toISOString().replace('Z','');

  constructor() { }
  
  getTime() {
    this.now = new Date(Date.now()+(1000*60*(-(new Date()).getTimezoneOffset()))).toISOString().replace('Z','')
  }
  
  async checkUsernameAvailable(username: string){
    const {data, error} = await this.supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .eq('username', username);
    if (error)
    {
      alert(error.message);
    }
    else if (data)
    {
      if (data.length == 0)
      {
        return true;
      }
      else
      {
        return false;
      } 
    }
    return null;
  }
  
  async createProfile(id: string, username: string){
    this.getTime();
    const {data, error} = await this.supabase
      .from('profiles')
      .insert([{ id: id, username: username, updated_at: this.now }]);
    if (error)
    {
      alert(error.message);
    }
  }
  
  async getProfile(id: string){
    const {data, error} = await this.supabase
      .from('profiles')
      .select()
      .eq('id', id);
    if (error)
    {
      alert(error);
    }
    else if (data)
    {
      if (data.length > 0)
      {
        return data;
      }
    }
    return null;
  }
  
  async updateUsername(id: string, username: string){
    this.getTime();
    const {data, error} = await this.supabase
      .from('profiles')
      .update({ username: username, updated_at: this.now })
      .match({ id: id });
    if (error)
    {
      alert(error.message);
    }
    else
    {
      alert('nom d\'utilisateur mis à jours !');
    }
  }
}

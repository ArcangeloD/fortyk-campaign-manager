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
  
  //home page
  async getHomePageText(){
    const {data, error} = await this.supabase
      .from('site_infos')
      .select('home_page_html');
    if (error)
    {
      alert(error.message);
    }
    else if (data)
    {
      return data[0]['home_page_html'];
    }
    return null;
  }

  //username management
  async getUsernameById(id: string){
    const {data, error} = await this.supabase
      .from('profiles')
      .select('username')
      .eq('id', id)
      .single();
    if (error)
    {
      alert(error.message);
    }
    else if (data)
    {
      return data.username;
    }
    return null;
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
      alert(error.message);
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
    const check = await this.checkUsernameAvailable(username);
    if (check)
    {
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
    else
    {
      alert('Il y a déjà un utilisateur avec ce nom !'); 
    }
  }
  
  //news management
  async newsSubscription() {
    return this.supabase.from('news');
  }
  
  async getAllNews()
  {
    const {data, error} = await this.supabase
      .from('news')
      .select('id, title, content, published_at, updated_at, profiles(username)')
      .order('published_at', { ascending: false });
    if (error)
    {
      alert(error.message);
    }
    else
    {
      return data;
    }
    return null
  }
  
  async getNewsRange(min: number, max: number)
  {
    const {data, error} = await this.supabase
      .from('news')
      .select('id, title, content, published_at, updated_at, profiles(username)')
      .order('published_at', { ascending: false })
      .range(min,max);
    if (error)
    {
      alert(error.message);
    }
    else
    {
      return data;
    }
    return null
  }
  
  async insertNews (author_id: string, title: string, content: string){
    const {data, error} = await this.supabase
      .from('news')
      .insert([{author_id: author_id, title: title, content: content}]);
    if (error)
    {
      alert(error.message);
    }
  }
  
  async getNewsByTitle (filter: string) {
    const {data, error} = await await this.supabase
      .from('news')
      .select('title, content, published_at, updated_at, profiles(username)')
      .ilike('title', '%'+filter+'%')
      .order('published_at', { ascending: false })
    if (error)
    {
      alert(error.message)
    }
    else
    {
      return data;
    }
    return null;
  }
  
  async updateNews() {
    
  }
  
  async deleteNews() {
    
  }
}

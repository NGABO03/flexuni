import { supabase } from './supabase';

export async function signUp(email:string,password:string,fullName:string){
  if(!supabase) throw new Error('Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY.');
  const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:fullName}}});
  if(error) throw error;
  return data;
}
export async function signIn(email:string,password:string){
  if(!supabase) throw new Error('Supabase is not configured.');
  const {data,error}=await supabase.auth.signInWithPassword({email,password});
  if(error) throw error;
  return data;
}
export async function signOut(){ if(supabase) await supabase.auth.signOut(); }
export async function searchUniversities(q:string){
  if(!supabase) return [];
  const {data,error}=await supabase.from('universities').select('id,name,city,country_id,verified').ilike('name',`%${q}%`).order('name').limit(30);
  if(error) throw error; return data ?? [];
}
export async function listOpportunities(){
  if(!supabase) return [];
  const {data,error}=await supabase.from('opportunities').select('*').order('deadline',{ascending:true}).limit(50);
  if(error) throw error; return data ?? [];
}
export async function listListings(){
  if(!supabase) return [];
  const {data,error}=await supabase.from('listings').select('*').order('created_at',{ascending:false}).limit(50);
  if(error) throw error; return data ?? [];
}
export async function listCommunities(){
  if(!supabase) return [];
  const {data,error}=await supabase.from('communities').select('*').order('name').limit(50);
  if(error) throw error; return data ?? [];
}

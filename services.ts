import {supabase} from './supabase';

async function query(table:string, columns='*', limit=50){
  if(!supabase) return [];
  const {data,error}=await supabase.from(table).select(columns).limit(limit);
  if(error) throw error; return data ?? [];
}
export const getCourses=()=>query('courses','*',50);
export const getResources=()=>query('resources','*',50);
export const getEvents=()=>query('events','*',30);
export const getMessages=()=>query('messages','*',50);
export const getNotifications=()=>query('notifications','*',50);
export const getServices=()=>query('campus_services','*',30);

export async function createListing(payload:any){
  if(!supabase) throw new Error('Supabase is not configured.');
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) throw new Error('Please sign in first.');
  const {data,error}=await supabase.from('listings').insert({...payload,seller_id:user.id}).select().single();
  if(error) throw error; return data;
}
export async function createPost(payload:any){
  if(!supabase) throw new Error('Supabase is not configured.');
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) throw new Error('Please sign in first.');
  const {data,error}=await supabase.from('posts').insert({...payload,author_id:user.id}).select().single();
  if(error) throw error; return data;
}

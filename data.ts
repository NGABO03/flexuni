import {supabase} from './supabase';

function requireClient(){ if(!supabase) throw new Error('Supabase is not configured. Add your EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY.'); return supabase; }
async function user(){ const s=requireClient(); const {data:{user},error}=await s.auth.getUser(); if(error) throw error; if(!user) throw new Error('Please sign in.'); return user; }

export async function opportunities(){
 const s=requireClient(); const {data,error}=await s.from('opportunities').select('*').order('deadline',{ascending:true}).limit(50);
 if(error) throw error; return data??[];
}
export async function listings(){
 const s=requireClient(); const {data,error}=await s.from('listings').select('*').order('created_at',{ascending:false}).limit(50);
 if(error) throw error; return data??[];
}
export async function posts(){
 const s=requireClient(); const {data,error}=await s.from('posts').select('*').order('created_at',{ascending:false}).limit(50);
 if(error) throw error; return data??[];
}
export async function createMarketplaceListing(title:string,description:string,price:number,category:string){
 const s=requireClient(), u=await user();
 const {data,error}=await s.from('listings').insert({seller_id:u.id,title,description,price,category}).select().single();
 if(error) throw error; return data;
}
export async function createCommunityPost(body:string){
 const s=requireClient(), u=await user();
 const {data,error}=await s.from('posts').insert({author_id:u.id,body}).select().single();
 if(error) throw error; return data;
}
export async function saveOpportunity(opportunityId:string){
 const s=requireClient(), u=await user();
 const {error}=await s.from('saved_opportunities').upsert({user_id:u.id,opportunity_id:opportunityId});
 if(error) throw error;
}
export function subscribeToMessages(userId:string,onChange:()=>void){
 if(!supabase) return ()=>{};
 const channel=supabase.channel(`messages:${userId}`).on('postgres_changes',{event:'*',schema:'public',table:'messages'},onChange).subscribe();
 return ()=>{supabase.removeChannel(channel)};
}

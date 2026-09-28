import {supabase} from './supabase';

export async function currentProfile(){
 if(!supabase) return null;
 const {data:{user}}=await supabase.auth.getUser();
 if(!user) return null;
 const {data,error}=await supabase.from('profiles').select('*').eq('id',user.id).maybeSingle();
 if(error) throw error; return data;
}
export async function reports(){
 if(!supabase) return [];
 const {data,error}=await supabase.from('reports').select('*').order('created_at',{ascending:false}).limit(100);
 if(error) throw error; return data??[];
}
export async function reportContent(targetType:string,targetId:string,reason:string,details:string){
 if(!supabase) throw new Error('Supabase is not configured.');
 const {data:{user}}=await supabase.auth.getUser(); if(!user) throw new Error('Please sign in.');
 const {data,error}=await supabase.from('reports').insert({reporter_id:user.id,target_type:targetType,target_id:targetId,reason,details}).select().single();
 if(error) throw error; return data;
}
export async function deleteOwnAccount(){
 if(!supabase) throw new Error('Supabase is not configured.');
 // Account deletion requires a trusted backend/Edge Function; never put a service-role key in the app.
 throw new Error('Account deletion must be handled by a protected server-side function.');
}

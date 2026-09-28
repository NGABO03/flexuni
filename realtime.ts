import {supabase} from './supabase';

export async function myNotifications(){
  if(!supabase) return [];
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return [];
  const {data,error}=await supabase.from('notifications').select('*').eq('user_id',user.id).order('created_at',{ascending:false}).limit(50);
  if(error) throw error; return data??[];
}

export async function myMessages(){
  if(!supabase) return [];
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return [];
  const {data,error}=await supabase.from('messages').select('*').or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`).order('created_at',{ascending:false}).limit(100);
  if(error) throw error; return data??[];
}

export async function sendMessage(recipientId:string,body:string){
  if(!supabase) throw new Error('Supabase is not configured.');
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) throw new Error('Please sign in.');
  const {data,error}=await supabase.from('messages').insert({
    sender_id:user.id,recipient_id:recipientId,body
  }).select().single();
  if(error) throw error; return data;
}

export function subscribeToTable(table:string,callback:()=>void){
  if(!supabase) return ()=>{};
  const channel=supabase.channel(`flexuni-${table}-${Date.now()}`)
    .on('postgres_changes',{event:'*',schema:'public',table},callback)
    .subscribe();
  return ()=>{supabase.removeChannel(channel)};
}

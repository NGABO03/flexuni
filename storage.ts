import {supabase} from './supabase';

export async function uploadPublicProfileImage(uri:string,filename:string){
 if(!supabase) throw new Error('Supabase is not configured.');
 const {data:{user}}=await supabase.auth.getUser(); if(!user) throw new Error('Please sign in.');
 const response=await fetch(uri); const blob=await response.blob();
 const path=`${user.id}/${filename}`;
 const {error}=await supabase.storage.from('profile-images').upload(path,blob,{upsert:true,contentType:blob.type||'image/jpeg'});
 if(error) throw error;
 const {data}=supabase.storage.from('profile-images').getPublicUrl(path);
 return data.publicUrl;
}

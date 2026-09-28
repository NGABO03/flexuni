import {supabase} from './supabase';

async function ctx(){
 if(!supabase) throw new Error('Supabase is not configured.');
 const {data:{user},error}=await supabase.auth.getUser();
 if(error) throw error; if(!user) throw new Error('Please sign in.');
 return {s:supabase,u:user};
}
export async function myUniversity(){
 const {s,u}=await ctx();
 const {data,error}=await s.from('profiles').select('*,universities(*)').eq('id',u.id).maybeSingle();
 if(error) throw error; return data;
}
export async function crud(table:string, action:'list'|'create'|'update'|'delete', payload:any={}, id?:string){
 const {s}=await ctx();
 if(action==='list'){const q=s.from(table).select('*'); const {data,error}=await q; if(error)throw error; return data??[]}
 if(action==='create'){const {data,error}=await s.from(table).insert(payload).select().single();if(error)throw error;return data}
 if(action==='update'){const {data,error}=await s.from(table).update(payload).eq('id',id).select().single();if(error)throw error;return data}
 const {error}=await s.from(table).delete().eq('id',id);if(error)throw error;return true;
}
export async function searchAll(term:string){
 const {s}=await ctx(); const q=`%${term}%`;
 const [c,o,l,p]=await Promise.all([
  s.from('courses').select('*').ilike('name',q).limit(8),
  s.from('opportunities').select('*').ilike('title',q).limit(8),
  s.from('listings').select('*').ilike('title',q).limit(8),
  s.from('posts').select('*').ilike('content',q).limit(8)
 ]);
 return {courses:c.data??[],opportunities:o.data??[],listings:l.data??[],posts:p.data??[]};
}
export async function uploadFile(bucket:string,path:string,file:any){
 const {s}=await ctx(); const {error}=await s.storage.from(bucket).upload(path,file,{upsert:true});
 if(error)throw error; return s.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

import {supabase} from './supabase';

async function clientAndUser(){
 if(!supabase) throw new Error('Supabase is not configured.');
 const {data:{user},error}=await supabase.auth.getUser();
 if(error) throw error; if(!user) throw new Error('Please sign in.');
 return {s: supabase,u:user};
}
export async function adminCourses(universityId:string){
 const {s}=await clientAndUser();
 const {data,error}=await s.from('courses').select('*').eq('university_id',universityId).order('name');
 if(error) throw error; return data??[];
}
export async function adminAnnouncements(universityId:string){
 const {s}=await clientAndUser();
 const {data,error}=await s.from('announcements').select('*').eq('university_id',universityId).order('created_at',{ascending:false});
 if(error) throw error; return data??[];
}
export async function adminEvents(universityId:string){
 const {s}=await clientAndUser();
 const {data,error}=await s.from('events').select('*').eq('university_id',universityId).order('starts_at');
 if(error) throw error; return data??[];
}
export async function createAnnouncement(universityId:string,title:string,body:string){
 const {s,u}=await clientAndUser();
 const {data,error}=await s.from('announcements').insert({university_id:universityId,author_id:u.id,title,body}).select().single();
 if(error) throw error; return data;
}
export async function createEvent(universityId:string,title:string,description:string,startsAt:string){
 const {s,u}=await clientAndUser();
 const {data,error}=await s.from('events').insert({university_id:universityId,created_by:u.id,title,description,starts_at:startsAt}).select().single();
 if(error) throw error; return data;
}

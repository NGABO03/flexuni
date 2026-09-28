import {supabase} from './supabase';

export async function saveStudentProfile(payload:{
  full_name:string; university_id?:string|null; program?:string|null; year_of_study?:number|null;
}){
  if(!supabase) throw new Error('Supabase is not configured.');
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) throw new Error('Please sign in first.');
  const {data,error}=await supabase.from('profiles').upsert({
    id:user.id, full_name:payload.full_name,
    university_id:payload.university_id ?? null,
    program:payload.program ?? null,
    year_of_study:payload.year_of_study ?? null,
    updated_at:new Date().toISOString()
  }).select().single();
  if(error) throw error;
  return data;
}

export async function getStudentProfile(){
  if(!supabase) return null;
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return null;
  const {data,error}=await supabase.from('profiles').select('*').eq('id',user.id).maybeSingle();
  if(error) throw error;
  return data;
}

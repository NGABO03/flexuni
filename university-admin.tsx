import {useEffect,useState} from 'react';
import {ActivityIndicator,Alert,Modal,Text,TextInput,TouchableOpacity,View,StyleSheet,ScrollView} from 'react-native';
import {currentProfile} from '../lib/admin';
import {adminCourses,adminAnnouncements,adminEvents,createAnnouncement,createEvent} from '../lib/universityAdmin';
import {crud} from '../lib/platform';

export default function UniversityAdmin(){
 const [profile,setProfile]=useState<any>(null),[busy,setBusy]=useState(true),[tab,setTab]=useState('overview');
 const [courses,setCourses]=useState<any[]>([]),[ann,setAnn]=useState<any[]>([]),[events,setEvents]=useState<any[]>([]),[services,setServices]=useState<any[]>([]);
 const [modal,setModal]=useState<string|null>(null),[title,setTitle]=useState(''),[body,setBody]=useState('');
 async function load(p:any){const id=p?.university_id;if(!id)return;const [c,a,e,sv]=await Promise.all([adminCourses(id),adminAnnouncements(id),adminEvents(id),crud('campus_services','list')]);setCourses(c);setAnn(a);setEvents(e);setServices(sv.filter((x:any)=>x.university_id===id))}
 useEffect(()=>{(async()=>{try{const p=await currentProfile();setProfile(p);await load(p)}catch(e:any){Alert.alert('University Admin',e?.message??'Could not load dashboard.')}finally{setBusy(false)}})()},[]);
 async function publish(){try{if(!profile?.university_id)return;
  if(modal==='announcement')await createAnnouncement(profile.university_id,title,body);
  else if(modal==='event')await createEvent(profile.university_id,title,body,new Date().toISOString());
  else if(modal==='service')await crud('campus_services','create',{university_id:profile.university_id,name:title,description:body});
  setModal(null);setTitle('');setBody('');await load(profile);Alert.alert('Saved','The university content has been updated.');
 }catch(e:any){Alert.alert('University Admin',e?.message??'Could not save.')}} 
 if(busy)return <View style={s.center}><ActivityIndicator/></View>;
 if(!profile?.university_id||!['university_admin','admin'].includes(profile?.role))return <View style={s.center}><Text style={s.denied}>University administrator access required</Text><Text style={s.muted}>Your account needs an authorized university role.</Text></View>;
 const tabs=[['overview','Overview'],['courses','Courses'],['ann','Announcements'],['events','Events'],['services','Services']];
 return <View style={s.wrap}><Text style={s.h}>University Admin</Text><Text style={s.sub}>Manage your university's FlexUni workspace</Text>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:10}}><View style={s.tabs}>{tabs.map(x=><TouchableOpacity key={x[0]} onPress={()=>setTab(x[0])} style={[s.tab,tab===x[0]&&s.active]}><Text style={[s.tabtxt,tab===x[0]&&s.activetxt]}>{x[1]}</Text></TouchableOpacity>)}</View></ScrollView>
 <ScrollView>{tab==='overview'&&<><View style={s.grid}>{[['Courses',courses.length],['Announcements',ann.length],['Events',events.length],['Services',services.length]].map(x=><View style={s.stat} key={String(x[0])}><Text style={s.num}>{x[1]}</Text><Text style={s.muted}>{x[0]}</Text></View>)}</View><Text style={s.sec}>Quick actions</Text>{[['announcement','＋ Publish announcement'],['event','＋ Create event'],['service','＋ Add campus service']].map(x=><TouchableOpacity key={x[0]} style={s.action} onPress={()=>setModal(x[0])}><Text style={s.at}>{x[1]}</Text></TouchableOpacity>)}</>}
 {tab==='courses'&&courses.map(x=><View style={s.card} key={x.id}><Text style={s.title}>{x.code??''} {x.name??x.title}</Text><Text style={s.muted}>{x.description??''}</Text></View>)}
 {tab==='ann'&&ann.map(x=><View style={s.card} key={x.id}><Text style={s.title}>{x.title}</Text><Text style={s.muted}>{x.body}</Text></View>)}
 {tab==='events'&&events.map(x=><View style={s.card} key={x.id}><Text style={s.title}>{x.title}</Text><Text style={s.muted}>{x.description??''}</Text><Text style={s.muted}>{x.starts_at??''}</Text></View>)}
 {tab==='services'&&services.map(x=><View style={s.card} key={x.id}><Text style={s.title}>{x.name??x.title}</Text><Text style={s.muted}>{x.description??''}</Text></View>)}</ScrollView>
 <Modal visible={!!modal} transparent animationType="slide"><View style={s.overlay}><View style={s.sheet}><Text style={s.sheeth}>{modal==='announcement'?'Publish announcement':modal==='event'?'Create event':'Add campus service'}</Text><TextInput style={s.input} placeholder="Title / name" value={title} onChangeText={setTitle}/><TextInput style={[s.input,{height:120}]} placeholder="Description / message" multiline textAlignVertical="top" value={body} onChangeText={setBody}/><TouchableOpacity style={s.btn} onPress={publish}><Text style={s.bt}>Save</Text></TouchableOpacity><TouchableOpacity onPress={()=>setModal(null)}><Text style={s.cancel}>Cancel</Text></TouchableOpacity></View></View></Modal>
 </View>
}
const s=StyleSheet.create({wrap:{flex:1,backgroundColor:'#F7F8FC',padding:20},center:{flex:1,backgroundColor:'#F7F8FC',alignItems:'center',justifyContent:'center',padding:25},h:{fontSize:29,fontWeight:'900',marginTop:35},sub:{color:'#777D91',marginBottom:16},denied:{fontSize:20,fontWeight:'900',textAlign:'center'},muted:{color:'#777D91',marginTop:4},tabs:{flexDirection:'row',gap:6},tab:{paddingVertical:9,paddingHorizontal:12,borderRadius:12,backgroundColor:'#fff'},active:{backgroundColor:'#4F46E5'},tabtxt:{fontWeight:'800',fontSize:12},activetxt:{color:'#fff'},grid:{flexDirection:'row',flexWrap:'wrap',gap:8},stat:{backgroundColor:'#fff',padding:16,borderRadius:16,width:'47%'},num:{fontSize:25,fontWeight:'900',color:'#4F46E5'},sec:{fontSize:20,fontWeight:'900',marginTop:22,marginBottom:10},action:{backgroundColor:'#fff',padding:17,borderRadius:16,marginBottom:9},at:{fontWeight:'850'},card:{backgroundColor:'#fff',padding:16,borderRadius:16,marginBottom:9},title:{fontWeight:'900',fontSize:16},overlay:{flex:1,backgroundColor:'rgba(0,0,0,.35)',justifyContent:'flex-end'},sheet:{backgroundColor:'#fff',padding:22,borderTopLeftRadius:25,borderTopRightRadius:25},sheeth:{fontSize:22,fontWeight:'900',marginBottom:15},input:{backgroundColor:'#F7F8FC',padding:14,borderRadius:14,marginBottom:10},btn:{backgroundColor:'#4F46E5',padding:16,borderRadius:14,alignItems:'center'},bt:{color:'#fff',fontWeight:'900'},cancel:{textAlign:'center',padding:16,fontWeight:'800'}});

import {useEffect,useState} from 'react';
import {ActivityIndicator,Alert,Text,TextInput,TouchableOpacity,View,StyleSheet,FlatList} from 'react-native';
import {router} from 'expo-router';
import {searchUniversities} from '../lib/api';
import {saveStudentProfile} from '../lib/onboarding';

export default function University(){
 const [q,setQ]=useState(''),[items,setItems]=useState<any[]>([]),[selected,setSelected]=useState<any|null>(null);
 const [name,setName]=useState(''),[program,setProgram]=useState(''),[year,setYear]=useState('1'),[busy,setBusy]=useState(false);
 useEffect(()=>{let t:any;if(q.trim().length>1){t=setTimeout(async()=>{try{setItems(await searchUniversities(q))}catch(e:any){Alert.alert('Search failed',e?.message)}} ,300)}else setItems([]);return()=>clearTimeout(t)},[q]);
 async function finish(){if(!selected){Alert.alert('Choose a university','Search and select your university first.');return}setBusy(true);try{await saveStudentProfile({full_name:name.trim()||'FlexUni Student',university_id:selected.id,program:program.trim()||null,year_of_study:Number(year)||1});router.replace('/home')}catch(e:any){Alert.alert('FlexUni',e?.message??'Could not save your profile.')}finally{setBusy(false)}}
 return <View style={s.wrap}>
  <Text style={s.h}>Set up your student profile</Text><Text style={s.p}>This information personalizes your FlexUni experience.</Text>
  <TextInput style={s.input} placeholder="Full name" value={name} onChangeText={setName}/>
  <TextInput style={s.input} placeholder="Program / course" value={program} onChangeText={setProgram}/>
  <TextInput style={s.input} placeholder="Year of study (1–8)" keyboardType="number-pad" value={year} onChangeText={setYear}/>
  <TextInput style={s.input} placeholder="Search university…" value={q} onChangeText={setQ}/>
  {selected?<TouchableOpacity style={s.selected} onPress={()=>setSelected(null)}><Text style={s.selTitle}>{selected.name}</Text><Text style={s.city}>{selected.city??''} • Tap to change</Text></TouchableOpacity>:
   <FlatList data={items} keyExtractor={x=>x.id} style={{maxHeight:230}} renderItem={({item})=><TouchableOpacity style={s.row} onPress={()=>{setSelected(item);setQ(item.name);setItems([])}}><Text style={s.selTitle}>{item.name}</Text><Text style={s.city}>{item.city??''}</Text></TouchableOpacity>}/>}
  <TouchableOpacity style={s.btn} disabled={busy} onPress={finish}><Text style={s.bt}>{busy?'Saving…':'Continue to FlexUni'}</Text></TouchableOpacity>
  <ActivityIndicator animating={busy}/>
 </View>
}
const s=StyleSheet.create({wrap:{flex:1,padding:22,backgroundColor:'#F7F8FC'},h:{fontSize:27,fontWeight:'900',marginTop:35,color:'#171A2B'},p:{color:'#777D91',lineHeight:21,marginVertical:10},input:{backgroundColor:'#fff',borderRadius:15,padding:15,borderWidth:1,borderColor:'#E4E6EF',marginBottom:10},row:{backgroundColor:'#fff',padding:15,borderRadius:14,marginBottom:7},selected:{backgroundColor:'#EDEBFF',padding:16,borderRadius:15,marginBottom:10},selTitle:{fontWeight:'850'},city:{color:'#777D91',marginTop:3},btn:{backgroundColor:'#4F46E5',padding:17,borderRadius:15,alignItems:'center',marginTop:12},bt:{color:'#fff',fontWeight:'900',fontSize:16}});

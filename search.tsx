import {useState} from 'react';
import {Text,TextInput,View,StyleSheet,ScrollView} from 'react-native';
import {searchUniversities} from '../lib/api';
export default function Search(){
 const [q,setQ]=useState(''),[universities,setUniversities]=useState<any[]>([]);
 async function change(v:string){setQ(v);if(v.trim().length>1){try{setUniversities(await searchUniversities(v))}catch{setUniversities([])}}else setUniversities([])}
 return <ScrollView style={s.wrap}><Text style={s.h}>Search FlexUni</Text><TextInput autoFocus style={s.input} placeholder="Universities, courses, opportunities…" value={q} onChangeText={change}/><Text style={s.sec}>Universities</Text>{universities.map(x=><View style={s.card} key={x.id}><Text style={s.title}>{x.name}</Text><Text style={s.muted}>{x.city??''}</Text></View>)}{q.length>1&&universities.length===0?<Text style={s.muted}>No matching universities found.</Text>:null}</ScrollView>}
const s=StyleSheet.create({wrap:{flex:1,backgroundColor:'#F7F8FC',padding:20},h:{fontSize:30,fontWeight:'900',marginTop:35,marginBottom:18},input:{backgroundColor:'#fff',padding:16,borderRadius:16},sec:{fontSize:19,fontWeight:'900',marginTop:25,marginBottom:10},card:{backgroundColor:'#fff',padding:16,borderRadius:16,marginBottom:8},title:{fontWeight:'850'},muted:{color:'#777D91',marginTop:4}});

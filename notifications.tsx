import {useEffect,useState} from 'react';
import {ActivityIndicator,Alert,FlatList,Text,View,StyleSheet} from 'react-native';
import {myNotifications,subscribeToTable} from '../lib/realtime';
export default function Notifications(){
 const [items,setItems]=useState<any[]>([]),[busy,setBusy]=useState(true);
 async function load(){try{setItems(await myNotifications())}catch(e:any){Alert.alert('Notifications',e?.message??'Could not load notifications.')}finally{setBusy(false)}}
 useEffect(()=>{load();const off=subscribeToTable('notifications',load);return off},[]);
 return <View style={s.wrap}><Text style={s.h}>Notifications</Text><Text style={s.sub}>Updates that matter to you</Text>{busy?<ActivityIndicator/>:<FlatList data={items} keyExtractor={(x,i)=>x.id??String(i)} ListEmptyComponent={<Text style={s.empty}>You're all caught up.</Text>} renderItem={({item})=><View style={s.card}><Text style={s.title}>{item.title??'FlexUni update'}</Text><Text style={s.body}>{item.body??item.message??''}</Text><Text style={s.time}>{item.created_at?new Date(item.created_at).toLocaleString():''}</Text></View>}/>}</View>}
const s=StyleSheet.create({wrap:{flex:1,backgroundColor:'#F7F8FC',padding:20},h:{fontSize:30,fontWeight:'900',marginTop:35},sub:{color:'#777D91',marginBottom:18},card:{backgroundColor:'#fff',padding:17,borderRadius:18,marginBottom:10},title:{fontWeight:'900',fontSize:16},body:{color:'#555C70',marginTop:6,lineHeight:20},time:{color:'#999',fontSize:11,marginTop:9},empty:{textAlign:'center',color:'#777D91',marginTop:50}});

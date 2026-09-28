import {useState} from 'react';
import {Alert,Text,TextInput,TouchableOpacity,View,StyleSheet} from 'react-native';
import {router} from 'expo-router';
import {signIn,signUp} from '../lib/api';
export default function Auth(){
 const [mode,setMode]=useState<'login'|'signup'>('signup'),[name,setName]=useState(''),[email,setEmail]=useState(''),[pass,setPass]=useState(''),[busy,setBusy]=useState(false);
 async function submit(){try{setBusy(true);if(mode==='signup'){await signUp(email,pass,name);Alert.alert('Account created','Confirm your email if required, then continue to your student profile.');router.replace('/university')}else{await signIn(email,pass);router.replace('/home')}}catch(e:any){Alert.alert('FlexUni',e?.message??'Something went wrong')}finally{setBusy(false)}}
 return <View style={s.wrap}><Text style={s.logo}>FlexUni</Text><Text style={s.h}>{mode==='signup'?'Create your account':'Welcome back'}</Text>
 {mode==='signup'&&<TextInput style={s.input} placeholder="Full name" value={name} onChangeText={setName}/>}
 <TextInput style={s.input} placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/>
 <TextInput style={s.input} placeholder="Password" secureTextEntry value={pass} onChangeText={setPass}/>
 <TouchableOpacity disabled={busy} style={s.btn} onPress={submit}><Text style={s.bt}>{busy?'Please wait…':mode==='signup'?'Create account':'Sign in'}</Text></TouchableOpacity>
 <TouchableOpacity onPress={()=>setMode(mode==='signup'?'login':'signup')}><Text style={s.switch}>{mode==='signup'?'Already have an account? Sign in':'New to FlexUni? Create an account'}</Text></TouchableOpacity>
 </View>
}
const s=StyleSheet.create({wrap:{flex:1,justifyContent:'center',padding:25,backgroundColor:'#F7F8FC'},logo:{fontSize:34,fontWeight:'900',color:'#4F46E5',marginBottom:40},h:{fontSize:28,fontWeight:'900',color:'#171A2B',marginBottom:22},input:{backgroundColor:'#fff',borderRadius:15,padding:16,marginBottom:12,borderWidth:1,borderColor:'#E4E6EF'},btn:{backgroundColor:'#4F46E5',padding:17,borderRadius:15,alignItems:'center',marginTop:5},bt:{color:'#fff',fontWeight:'900',fontSize:16},switch:{textAlign:'center',color:'#4F46E5',fontWeight:'700',marginTop:20}});

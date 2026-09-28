import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
export default function Start(){
 const [email,setEmail]=useState('');
 return <View style={s.wrap}><View style={s.logo}><Text style={s.logoText}>F</Text></View>
 <Text style={s.brand}>FlexUni</Text><Text style={s.tag}>Your University Life, Simplified</Text>
 <Text style={s.h}>One app for your whole student life.</Text>
 <Text style={s.p}>Study, discover opportunities, connect with students, buy and sell, and access campus services.</Text>
 <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor="#9BA0B5" style={s.input} autoCapitalize="none" keyboardType="email-address"/>
 <TouchableOpacity style={s.btn} onPress={()=>router.push('/auth')}><Text style={s.btnText}>Get Started</Text></TouchableOpacity>
 <Text style={s.small}>You can connect your university after creating your account.</Text></View>
}
const s=StyleSheet.create({wrap:{flex:1,padding:26,justifyContent:'center',backgroundColor:'#F7F8FC'},logo:{width:70,height:70,borderRadius:22,backgroundColor:'#4F46E5',alignItems:'center',justifyContent:'center'},logoText:{fontSize:36,fontWeight:'900',color:'#fff'},brand:{fontSize:32,fontWeight:'900',marginTop:16,color:'#171A2B'},tag:{fontSize:15,color:'#5B61D6',fontWeight:'700',marginTop:4},h:{fontSize:27,fontWeight:'900',marginTop:42,color:'#171A2B'},p:{fontSize:15,lineHeight:23,color:'#6E7388',marginTop:12,marginBottom:24},input:{backgroundColor:'#fff',borderRadius:16,padding:16,fontSize:16,borderWidth:1,borderColor:'#E5E7F0'},btn:{backgroundColor:'#4F46E5',padding:17,borderRadius:16,alignItems:'center',marginTop:12},btnText:{color:'#fff',fontSize:16,fontWeight:'800'},small:{textAlign:'center',color:'#85899C',fontSize:12,marginTop:16}});

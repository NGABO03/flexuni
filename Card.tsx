import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
export function Card({title,subtitle,children}: {title:string;subtitle?:string;children?:ReactNode}) {
 return <View style={s.card}><Text style={s.title}>{title}</Text>{subtitle&&<Text style={s.sub}>{subtitle}</Text>}{children}</View>
}
const s=StyleSheet.create({card:{backgroundColor:'#fff',borderRadius:22,padding:18,marginBottom:14,shadowColor:'#18204a',shadowOpacity:.06,shadowRadius:14,elevation:2},title:{fontSize:17,fontWeight:'800',color:'#171A2B'},sub:{marginTop:5,color:'#73788D',fontSize:13}});

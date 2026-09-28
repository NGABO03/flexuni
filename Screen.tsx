import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export function Screen({children}: {children: ReactNode}) {
  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.content}>{children}</ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#F7F8FC'},content:{padding:20,paddingBottom:40}});

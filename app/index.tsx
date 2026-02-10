import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home() {
    const [value, setValue] = useState("")
    const [animalName, setAnimalName] = useState("")

    // เมื่อเปิดแอปฟังก์ชัน loadAnimal ทำไง
    useEffect(() => { 
        loadAnimal()
    }, [])
    
       
    async function saveAnimal(){
        await AsyncStorage.setItem("animal", value)
        setAnimalName(value)
        setValue("")
    }

    // สั่งให้โหลด
    async function loadAnimal() {
        const a = await AsyncStorage.getItem("animal")
        // setAnimalName(a!.toString())
        if(a == ""){
            setAnimalName("ยังไม่ได้บันทึกค่า")
        }else{
            setAnimalName(a!)
        }
    }

    // สั่งให้ลบ
    async function removeAnimal() {
        await AsyncStorage.removeItem("animal")
        setAnimalName("")
    }
    return(
        <View style={myStyles.container}>
            {/*แสดงข้อความ*/}
            <Text style={{ borderRadius:20,marginBottom:60,backgroundColor:"#FFE4E1",padding:20,color:"#B03060",fontSize: 25, fontWeight: 700}}>
                Animal : {animalName}
            </Text>

            {/*กรอกค่า*/}
            <TextInput style={myStyles.Input} value={value} onChangeText={setValue} placeholder="กรุณากรอกชื่อสัตว์"/>

            {/*ปุ่มกดบันทึก xxxx*/}
            <View style={{flexDirection:"row",gap:100}}>
                
                <TouchableOpacity onPress={saveAnimal} style= {{backgroundColor:"#E6E6FA",padding:20,marginTop:20,borderRadius:40,borderWidth:3,borderColor:"#F0F8FF"}} >
                    <Text style={{fontSize: 20, fontWeight: 300,color:"blue"}}>บันทึก</Text>
                </TouchableOpacity>
            {/*ปุ่มลบ*/}
                <TouchableOpacity onPress={removeAnimal} style= {{backgroundColor:"#DCDCDC",padding:20,marginTop:20,borderRadius:40,borderWidth:3,borderColor:"white"}} >
                    <Text style={{fontSize: 20, fontWeight: 300,color:"blue"}}>ลบ</Text>
                </TouchableOpacity> 
            </View>
        </View>
    )

}

const myStyles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"silver"
    },
    Input :{
        borderWidth:1,
        width:"80%"
    }

})
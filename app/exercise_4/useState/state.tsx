import React from "react";
import { useState } from "react";
import { Text, View, Button } from "react-native"; 

export default function State() {

  const [count, setCount] = useState(0);

  function handleButtonPress(){
 
   setCount(function (c) {
    return c + 1;
   })
  }
  return (
    <View style={{ padding: 20}}>
      <Text style={{fontSize: 100, fontWeight: 600 }}>
        {count}
      </Text>
      <Button
        onPress={handleButtonPress}
        title="Click Me"
      />
    </View>
  );
}
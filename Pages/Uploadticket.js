import { View, Text , StyleSheet , Image, Pressable, Alert } from 'react-native'
import React , {useEffect , useState} from 'react'

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ScrollView } from 'react-native';

SplashScreen.preventAutoHideAsync();

import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';



const Uploadticket = ({ route , navigation}) => {
  const userId= "surya";
  const [pickedDocumentName1, setPickedDocumentName1] = useState(null);
  const [pickedDocumentName2, setPickedDocumentName2] = useState(null);

  const [uri1, setUri1] = useState(null);
  const [uri2, setUri2] = useState(null);

  const [imgInServer1, setimgInServer1] = useState(null);
  const [imgInServer2, setimgInServer2] = useState(null);





  const { tripData } = route.params;

  


  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
  });

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        alert('Permission to access media library required!');
      }
    })();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  if (!fontsLoaded) {
    return null;
  }


  const pickDocument1 = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Allow any image format
      });

      console.log('Document picked:', document);

      if (document.type !== 'cancel') {
        const { uri, name } = document.assets[0]; // Directly use document.name and document.uri
        console.log('Document Name:', name);
        console.log('Document URI:', uri);
         // Set the picked document name to state

        // Prepare form data to send to Node.js server
        const formData = new FormData();
        formData.append('imageFile', {
          uri,
          name: `${userId}_1_${name}`,
          type: 'image/*', // Adjust MIME type for images
          
        });
        //formData.append('userId', userId); // Append userId to form data

        // Send image file to Node.js server
        const response = await fetch('http://192.168.102.172:3000/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
          Alert.alert('Error while uploading the image , please do try with compressed version of the image');
          setPickedDocumentName1(null);
          setUri1(null);
          setimgInServer1(null);
        }

        const responseData = await response.text();
        console.log('File uploaded: ',responseData);
        setPickedDocumentName1(name);
        setUri1(uri);
        setimgInServer1(responseData);
        // Optionally handle success response from server
      } else {
        console.log('Document picking cancelled');
        Alert.alert('Error while uploading the image , please do try with compressed version of the image');
        setPickedDocumentName1(null);
        setUri1(null);
        setimgInServer1(null);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
      Alert.alert('Error while uploading the image , please do try with compressed version of the image');
      setPickedDocumentName1(null);
      setUri1(null);
      setimgInServer1(null);
    }
  };


  
  const pickDocument2 = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Allow any image format
      });

      console.log('Document picked:', document);

      if (document.type !== 'cancel') {
        const { uri, name } = document.assets[0]; // Directly use document.name and document.uri
        console.log('Document Name:', name);
        console.log('Document URI:', uri);
        setPickedDocumentName2(name); // Set the picked document name to state

        // Prepare form data to send to Node.js server
        const formData = new FormData();
        formData.append('imageFile', {
          uri,
          name: `${userId}_2_${name}`,
          type: 'image/*', // Adjust MIME type for images
          
        });
        //formData.append('userId', userId); // Append userId to form data

        // Send image file to Node.js server
        const response = await fetch('http://192.168.102.172:3000/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
          Alert.alert('Error while uploading the image , please do try with compressed version of the image');
          setPickedDocumentName2(null);
          setUri2(null);
          setimgInServer2(null);
        }

        const responseData = await response.text();
        console.log('File uploaded:', responseData);
        setUri2(uri);
        setimgInServer2(responseData)
        // Optionally handle success response from server
      } else {
        console.log('Document picking cancelled');
        setPickedDocumentName2(null); // Reset picked document name if cancelled
        Alert.alert('Error while uploading the image , please do try with compressed version of the image');
        setUri2(null);
        setimgInServer2(null);
        
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setPickedDocumentName2(null); // Reset picked document name on error
      Alert.alert('Error while uploading the image , please do try with compressed version of the image');
      setUri2(null);
      setimgInServer2(null);
      
    }
  };

  const navigatetoReview = async() => {
    navigation.navigate('ReviewTrip' , { tripData , img1 : uri1 , img2 : uri2 , imgInServer1 , imgInServer2 });
  }


  return (

    <ScrollView className='flex-1 h-full bg-[#fafcff] ' >
    <View className='flex-1 px-2 bg-[#fafcff] py-9' >
    <View className='px-5'>

        <View className=''>
            
        <Text style={[styles.popsemi , {fontSize:18} ]}>Travel-to tickets : </Text>

        <Pressable onPress={pickDocument1}>
            <View style={styles.roundedContainer} className='h-36 bg-white mt-4'>      
            <View style={styles.dashedBorder} className='flex-1 items-center justify-center' >
                    <Image
                        source={require('../assets/Icon frame.png')} // Replace with your actual image path
                        resizeMode="contain"
                        className = 'h-12'
                    />
                    <View className='flex flex-row mt-2'>
                        <Text style={styles.popreg}>Click to Upload</Text>
                        <Text style={styles.popreg}> or drag and drop</Text>
                    </View>
                    <Text style={styles.popreg}>only ( images )</Text>
                    <Text className='items-center' style={styles.popreg}>(Max. File size: 10 MB)</Text>
            </View>
            </View>
        </Pressable>

            <View className='h-14 bg-white border border-[#CACACA] rounded-lg mt-4  justify-center '>
                
                {pickedDocumentName1 && (
                  <View className='flex flex-row items-center  justify-center '>
                        <Image
                                        source={require('../assets/document-text.png')} // Replace with your actual image path
                                        resizeMode="contain"
                                        className = 'h-8        '
                        />
                        <View className='w-40 h-5'>
                        <Text className=' overflow-x-scroll' style={styles.popreg}>{pickedDocumentName1}</Text>
                        </View>
                        <Image
                                        source={require('../assets/tick-circle.png')} // Replace with your actual image path
                                        resizeMode="contain"
                                        className = 'h-6'
                        />
                        </View>
                )}
                
            </View>

        </View>





        <View className='mt-10'>
            
        <Text style={[styles.popsemi , {fontSize:18} ]}>Travel-back tickets :  </Text>
        <Pressable onPress={pickDocument2}>
            <View style={styles.roundedContainer} className='h-32 bg-white mt-4'>      
            <View style={styles.dashedBorder} className='flex-1 items-center justify-center' >
                    <Image
                        source={require('../assets/Icon frame.png')} // Replace with your actual image path
                        resizeMode="contain"
                        className = 'h-12'
                    />
                    <View className='flex flex-row mt-2'>
                        <Text style={styles.popreg}>Click to Upload</Text>
                        <Text style={styles.popreg}> or drag and drop only ( .pdf )</Text>
                    </View>
                    <Text className='items-center' style={styles.popreg}>(Max. File size: 10 MB)</Text>
            </View>
            </View>
            </Pressable>
            

            <View className='h-14 bg-white border border-[#CACACA] rounded-lg mt-4  justify-center '>
            {pickedDocumentName2 && (
                <View className='flex flex-row items-center  justify-center '>
                        <Image
                                        source={require('../assets/document-text.png')} // Replace with your actual image path
                                        resizeMode="contain"
                                        className = 'h-8        '
                        />
                        <View className='w-40 h-5'>
                        <Text className='' style={styles.popreg}>{pickedDocumentName2}</Text>
                        </View>

                        <Image
                                        source={require('../assets/tick-circle.png')} // Replace with your actual image path
                                        resizeMode="contain"
                                        className = 'h-6'
                        />

                </View>
            )}
            </View>

        </View>

<Pressable  onPress={navigatetoReview}>
      <View className='items-end my-5 mt-6 mr-3'>

      <View className='flex flex-row gap-x-2 items-center justify-center h-12 w-32 rounded-2xl border-[0.2px] bg-white' style ={styles.card}>

        <View  >
          <Text className='text-base' style={styles.popreg}>Preview</Text>
        </View>

        <Image
          source={require('../assets/next.png')} // Replace with your actual image path
          className ='h-3 mt-[-1px]'
          resizeMode="contain"
        />
        
      </View>
      </View>
      </Pressable>                                                    


      
    </View>
    
    </View>
    </ScrollView>
  )
}

export default Uploadticket


const styles = StyleSheet.create({
    roundedContainer: {
      
      borderRadius: 10,
      
    },
    dashedBorder: {
      borderWidth: 2,
      borderColor: '#CACACA',
      borderStyle: 'dashed',
      borderRadius: 10,
    },
    popreg: {
        fontFamily: 'Poppins-Regular',
      },
      popsemi: {
        fontFamily: 'Poppins-SemiBold',
      },

  });
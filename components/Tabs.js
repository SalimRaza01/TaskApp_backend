import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native'; 
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import TaskDetails from './TaskDetails';
import Settings from './Settings';
import TaskModal from './TaskModal';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const CustonTabBarButton = ({ children }) => {
  const navigation = useNavigation(); 

  const handlePress = () => {
    navigation.navigate('Add Task',  { task: newTask, setTask: setNewTask });
  };

  return (
    <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={() => {
      navigation.navigate('TaskModal');
    }}
  >
      <View style={{
        width: width * 0.16,
        height: width * 0.16,
        borderRadius: 35,
        backgroundColor: '#000000',
        ...styles.shadow
      }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Tabs = ({ navigation }) => {
  return (
    <Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            height: 75,
            ...styles.shadow
        }
    }}>

        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ focused }) => (
                <View>
                    <Image
                        style={{
                            width: width * 0.06,
                            height: width * 0.06,
                            tintColor: focused ? '#007BFF' : '#000000',
                        }}
                        source={require('../assets/Home.png')}
                    />
                </View>
            )
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
            tabBarIcon: ({ focused }) => (
                <View>
                    <Image
                        style={{
                            width: width * 0.06,
                            height: width * 0.06,
                            tintColor: focused ? '#007BFF' : '#000000',
                        }}
                        source={require('../assets/ProfileIcon.png')}
                    />
                </View>
            )
        }} />
        <Tab.Screen name="Add Task" component={TaskModal} options={{
            tabBarIcon: ({ focused }) => (
                <Image
                    style={{
                        width: width * 0.06,
                        height: width * 0.06,
                        tintColor: '#FFFFF',
                    }}
                    source={require('../assets/addtaskwhite.png')}
                />
            ),
            tabBarButton: (props) => (
                <CustonTabBarButton {...props} navigation={navigation} />
            )
        }} />

        <Tab.Screen name="Settings" component={Settings} options={{
            tabBarIcon: ({ focused }) => (
                <View>
                    <Image
                        style={{
                            width: width * 0.06,
                            height: width * 0.06,
                            tintColor: focused ? '#007BFF' : '#000000',
                        }}
                        source={require('../assets/Setting.png')}
                    />
                </View>
            )
        }} />
        <Tab.Screen name="Splash" component={TaskDetails} options={{
            tabBarIcon: ({ focused }) => (
                <View>
                    <Image
                        style={{
                            width: width * 0.06,
                            height: width * 0.06,
                            tintColor: focused ? '#007BFF' : '#000000',
                        }}
                        source={require('../assets/star.png')}
                    />
                </View>
            )
        }} />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'grey',
        shadowOffset: {
            width: width * 0,
            height: height * 1,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.5,
        elevation: 5
    },
})

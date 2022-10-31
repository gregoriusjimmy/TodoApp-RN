import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import ActivityEmptyStateImage from '@assets/images/activity-empty-state.png';
import {CText} from '@components/CText/CText';
import {Button} from '@components/Button/Button';
import {spacing} from '@utils/theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TRootStackParamList} from '@src/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

type TActivitiesScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'Activities'
>;

type TActivity = {
  id: number;
  title: string;
  created_at: Date;
};

type TGetActivitiesRes = {
  total: number;
  limit: number;
  skip: number;
  data: TActivity[];
};

export function ActivitiesScreen() {
  const navigation = useNavigation<TActivitiesScreenNavigationProp>();
  const [activities, setActivities] = useState<TActivity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get<TGetActivitiesRes>(
          'activity-groups?email=gregoriusjimmy@gmail.com',
        );
        setActivities(res.data.data);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchActivities();
  }, []);

  const renderItem = ({item}: ListRenderItemInfo<TActivity>) => {
    const {title, id, created_at} = item;
    return (
      <TouchableOpacity style={{height: 50}}>
        <CText>{title}</CText>
        <View>
          <CText>{moment(created_at).format('D MMMM YYYY')}</CText>
          <Button>delete icon</Button>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: spacing.layout}}>
      <View
        style={{
          marginVertical: spacing[24],
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CText>Activity</CText>
        <Button onPress={() => navigation.push('Activity', {type: 'ADD'})}>
          Tambah
        </Button>
      </View>
      {activities.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={activities}
            renderItem={item => renderItem(item)}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={ActivityEmptyStateImage} />
        </View>
      )}
    </View>
  );
}

import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ActivityEmptyStateImage from '@assets/images/activity-empty-state.png';
import {CText} from '@components/CText/CText';
import {Button} from '@components/Button/Button';
import {spacing, colors} from '@utils/theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TRootStackParamList} from '@src/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import TodoEmptyStateImg from '@assets/images/todo-empty-state.png';
import {CModal} from '@components/CModal/CModal';
import {InputField} from '@components/InputField/InputField';
import {AddListItemModal, SelectBoxPriority} from './UIAcitivity';

import PlusIcon from '@assets/icons/tabler_plus.png';

type TActivityScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'Activity'
>;

export type TPriority = {
  label: string;
  value: 'very-high' | 'high' | 'normal' | 'low' | 'very-low';
  color: string;
};

export function ActivityScreen() {
  const navigation = useNavigation<TActivityScreenNavigationProp>();
  const [openModal, setOpenModal] = useState(false);
  const [activityName, setActivityName] = useState('New Activity Name');
  const [itemNameInput, setItemNameInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<TPriority | null>(
    null,
  );

  const handlePressAddTodo = () => {
    setOpenModal(true);
  };

  const handlePressSave = () => {};

  return (
    <View style={{flex: 1, paddingHorizontal: spacing.layout}}>
      <AddListItemModal
        handlePressSave={handlePressSave}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        visible={openModal}
        setVisible={setOpenModal}
        itemNameInput={itemNameInput}
        setItemNameInput={setItemNameInput}
      />
      <View
        style={{
          marginVertical: spacing[24],
        }}>
        <TextInput
          value={activityName}
          onChangeText={val => setActivityName(val)}
        />
      </View>
      <View
        style={{
          marginBottom: spacing[24],
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Button
          size="s"
          onPress={handlePressAddTodo}
          iconPosition="left"
          icon={PlusIcon}>
          Tambah
        </Button>
      </View>
      <View style={{flex: 1}}>
        <Image source={TodoEmptyStateImg} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {paddingVertical: spacing[16], width: 300, maxWidth: '80%'},
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.base.lightGray,
    paddingHorizontal: spacing[16],
    justifyContent: 'space-between',
    paddingBottom: spacing[16],
  },
});

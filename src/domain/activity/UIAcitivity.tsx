import {CText, CTEXT} from '@components/CText/CText';
import {spacing, colors} from '@utils/theme';
import React, {Dispatch} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {TPriority} from './ActivityScreen';
import ChevronDownIcon from '@assets/icons/tabler_chevron-down.png';
import ChevronUpIcon from '@assets/icons/tabler_chevron-up.png';
import CheckIcon from '@assets/icons/tabler_check.png';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CModal} from '@components/CModal/CModal';
import {InputField} from '@components/InputField/InputField';
import ModalAddCloseButtonIcon from '@assets/icons/modal-add-close-button.png';
import {Button} from '@components/Button/Button';

const PRIORITIES: TPriority[] = [
  {label: 'Very High', value: 'very-high', color: '#ED4C5C'},
  {label: 'High', value: 'high', color: '#F8A541'},
  {label: 'Normal', value: 'normal', color: '#00A790'},
  {label: 'Low', value: 'low', color: '#428BC1'},
  {label: 'Very Low', value: 'very-low', color: '#8942C1'},
];

export const SelectBoxPriority = ({
  selectedPriority,
  setSelectedPriority,
}: {
  selectedPriority: TPriority | null;
  setSelectedPriority: Dispatch<React.SetStateAction<TPriority | null>>;
}) => {
  const ColorIcon = ({
    color,
    small = false,
  }: {
    color: string;
    small?: boolean;
  }) => (
    <View
      style={{
        width: small ? 8 : 12,
        height: small ? 8 : 12,
        backgroundColor: color,
        borderRadius: 100,
      }}
    />
  );

  const renderDropdownIcon = (isOpened: boolean) => {
    return isOpened ? (
      <Image source={ChevronUpIcon} />
    ) : (
      <Image source={ChevronDownIcon} />
    );
  };

  const renderCustomizedButtonChild = (selectedItem: TPriority) => {
    if (selectedItem) {
      return (
        <View style={styles.dropdownBtnContent}>
          <ColorIcon small color={selectedItem.color} />
          <CText style={styles.dropdownBtnContentText}>
            {selectedItem.label}
          </CText>
        </View>
      );
    }
    return <CText>Pilih priority</CText>;
  };

  const renderCustomizedRowChild = (item: TPriority) => {
    return (
      <View style={styles.dropdownChild}>
        <View style={styles.dropdownBtnContent}>
          <ColorIcon color={item.color} />
          <CText style={styles.dropdownChildContentText}>{item.label}</CText>
        </View>
        {item === selectedPriority && <Image source={CheckIcon} />}
      </View>
    );
  };

  return (
    <SelectDropdown
      data={PRIORITIES}
      onSelect={(selectedItem: TPriority) => setSelectedPriority(selectedItem)}
      renderDropdownIcon={renderDropdownIcon}
      dropdownIconPosition="right"
      dropdownStyle={styles.dropdown}
      defaultButtonText={'Pilih Priority'}
      buttonStyle={styles.dropdownBtn}
      buttonTextStyle={styles.dropdownBtnText}
      renderCustomizedButtonChild={renderCustomizedButtonChild}
      renderCustomizedRowChild={renderCustomizedRowChild}
    />
  );
};

export const AddListItemModal = ({
  visible,
  setVisible,
  itemNameInput,
  setItemNameInput,
  selectedPriority,
  setSelectedPriority,
  handlePressSave,
}: {
  visible: boolean;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  itemNameInput: string;
  setItemNameInput: Dispatch<React.SetStateAction<string>>;
  handlePressSave: (event: GestureResponderEvent) => void;
  selectedPriority: TPriority | null;
  setSelectedPriority: Dispatch<React.SetStateAction<TPriority | null>>;
}) => {
  return (
    <CModal visible={visible} handleCloseModal={() => setVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <CText variant="subtitleMedium">Tambah List Item</CText>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Image source={ModalAddCloseButtonIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <InputField
            value={itemNameInput}
            onChangeText={e => setItemNameInput(e)}
            label="NAMA LIST ITEM"
            placeholder="Tambahkan nama list item"
            style={styles.nameListInput}
          />
          <View>
            <CText variant="captionBold" style={styles.priorityLabel}>
              PRIORITY
            </CText>
            <SelectBoxPriority
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
            />
          </View>
        </View>
        <View style={styles.modalFooter}>
          <Button onPress={handlePressSave} style={styles.saveBtn}>
            Simpan
          </Button>
        </View>
      </View>
    </CModal>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    borderRadius: spacing[8],
    borderWidth: 1,
    borderColor: colors.base.lightGray,
  },
  dropdownBtn: {
    minHeight: spacing[40],
    borderWidth: 1,
    paddingHorizontal: spacing[16],
    borderColor: colors.base.lightGray,
    borderRadius: spacing[8],
    width: '100%',
  },
  dropdownBtnContent: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  dropdownBtnContentText: {marginLeft: spacing[12]},
  dropdownBtnText: {
    fontSize: CTEXT.fontSize.p,
    fontFamily: CTEXT.fontFamily.regular,
    color: colors.base.black,
  },
  dropdownChild: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[16],
    minHeight: spacing[40],
    alignItems: 'center',
  },
  dropdownChildContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownChildContentText: {marginLeft: spacing[12]},
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
  modalContent: {
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[20],
  },
  nameListInput: {marginBottom: spacing[20]},
  priorityLabel: {marginBottom: spacing[4]},
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.base.lightGray,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing[16],
  },
  saveBtn: {marginTop: spacing[16]},
});

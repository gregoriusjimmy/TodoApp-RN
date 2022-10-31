import {colors, spacing} from '@utils/theme';
import {forwardRef} from 'react';
import {Modal, ModalProps, Pressable, StyleSheet, View} from 'react-native';

interface Props extends ModalProps {
  children: JSX.Element;
  handleCloseModal: () => void;
}

export const CModal = forwardRef<Modal, Props>(
  ({children, handleCloseModal, ...otherProps}, ref) => {
    return (
      <Modal ref={ref} transparent={true} animationType="fade" {...otherProps}>
        <View style={styles.modal}>
          <Pressable style={styles.backdrop} onPress={handleCloseModal} />
          <View style={styles.content}>{children}</View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    opacity: 0.5,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.base.black,
    flex: 1,
  },
  modal: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: colors.base.white,
    borderRadius: spacing[12],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

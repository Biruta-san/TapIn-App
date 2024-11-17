import Accordion from 'react-native-collapsible/Accordion';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, ReactNode, useState} from 'react';
import {Divider} from '@ui-kitten/components';
import {retrieveColorString} from '../../utils/enums/styleEnums';
import Text from '../Typography/Text';

interface Section {
  title?: string;
  content?: ReactNode;
  onPress?: () => void;
  children?: ReactNode;
}

interface CustomAccordionProps {
  sections: Section[];
  activeSections?: number[];
  setActiveSections?: (sections: number[]) => void;
  underlayColor?: string;
}

// #region COMPONENTS
const AccordionContent = (section: Section) => {
  return (
    <View style={styles.accordionContent}>
      {section?.content || <Text>No Content</Text>}
    </View>
  );
};

const AccordionHeader = (section: Section, _: number, isActive: boolean) => {
  return (
    <>
      <Text style={isActive ? styles.activeTitle : styles.inactiveTitle}>
        {section?.title || 'Untitled'}
      </Text>
      <Divider style={styles.divider} />
    </>
  );
};

const AccordionTouchable = (section: Section) => {
  return (
    <TouchableOpacity onPress={section?.onPress} style={styles.accordionHeader}>
      {section?.children || <Text>No Content</Text>}
    </TouchableOpacity>
  );
};
// #endregion

const CustomAccordion: FC<CustomAccordionProps> = ({
  sections,
  activeSections,
  setActiveSections,
  underlayColor,
}) => {
  // #region HOOKS
  const [localActiveSections, setLocalActiveSections] = useState<number[]>([]);
  // #endregion

  // #region FUNCTIONS
  const getActiveSections = (): number[] => {
    return activeSections ?? localActiveSections;
  };

  const handleSetActiveSections = (newActiveSections: number[]) => {
    if (setActiveSections) {
      setActiveSections(newActiveSections);
    } else {
      setLocalActiveSections(newActiveSections);
    }
  };
  // #endregion

  return (
    <Accordion
      sections={sections}
      activeSections={getActiveSections()}
      renderHeader={AccordionHeader}
      renderContent={AccordionContent}
      onChange={newActiveSections => {
        handleSetActiveSections(newActiveSections);
      }}
      touchableComponent={AccordionTouchable}
      underlayColor={underlayColor ?? 'transparent'}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  accordionHeader: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
  },
  accordionContent: {
    width: '100%',
    padding: 10,
  },
  activeTitle: {
    fontWeight: 'bold',
  },
  inactiveTitle: {
    color: '#333',
  },
  divider: {
    backgroundColor: retrieveColorString() || '#ccc',
    height: 1.5,
  },
});

export default CustomAccordion;

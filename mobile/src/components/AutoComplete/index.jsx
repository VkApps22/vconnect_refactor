import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Menu, TextInput } from '../third-party-components';

const CustomMenu = styled(View)`
  border-color: #00447a;
  border-radius: 8px;
  border-width: 1px;
  display: flex;
  margin-top: 8px;
  max-height: 150px;
`;

const MenuItem = styled(Menu.Item)`
  max-width: 100%;
  padding: 0;
`;

const AutoComplete = forwardRef(
  ({ data, value, onChange, onLayout, onSubmitEditing, ...props }, ref) => {
    const { i18n } = useTranslation();
    const inputElementRef = useRef(null);
    const sortedData = useMemo(
      () =>
        data.sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase(), i18n.language)
        ),
      [data, i18n.language]
    );

    const [menuVisible, setMenuVisible] = useState(false);
    const [itemsList, setItemsList] = useState([]);

    useImperativeHandle(ref, () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }));

    const normalize = (text) =>
      text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();

    const filterList = (text) => {
      if (text.length <= 0) {
        setItemsList([]);
        return;
      }

      const formattedValue = normalize(text);
      const filteredList = sortedData
        .sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase(), i18n.language)
        )
        .filter((item) => normalize(item).startsWith(formattedValue));
      setItemsList(filteredList.slice(0, 3));
    };

    const handleChangeText = (text) => {
      onChange(text);

      filterList(text);
      setMenuVisible(true);
    };

    const handleMenuItemPress = (item) => {
      filterList(item);
      onChange(item);
      setMenuVisible(false);
    };

    return (
      <View
        onLayout={onLayout}
        onFocus={() => {
          filterList(value);
          setMenuVisible(true);
        }}
        onBlur={() => {
          setMenuVisible(false);
          if (itemsList.length === 1) handleMenuItemPress(itemsList[0]);
        }}
      >
        <TextInput
          ref={inputElementRef}
          clearButtonMode="while-editing"
          value={value}
          onChangeText={handleChangeText}
          {...props}
          onSubmitEditing={() => {
            if (itemsList && itemsList.length === 1)
              handleMenuItemPress(itemsList[0]);

            onSubmitEditing();
          }}
        />
        {itemsList.length > 0 && menuVisible && (
          <CustomMenu>
            {itemsList.map((item) => (
              <MenuItem
                key={item}
                onPress={() => handleMenuItemPress(item)}
                title={item}
              />
            ))}
          </CustomMenu>
        )}
      </View>
    );
  }
);

AutoComplete.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func,
  onLayout: PropTypes.func,
};

AutoComplete.defaultProps = {
  data: [],
  value: '',
  onLayout: () => {},
  onSubmitEditing: () => {},
};

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;

import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import styled, {css} from 'styled-components';

import Image from './Image';

const Wrapper = styled(View)`
  background-color: #fff;
  border: solid 2px ${props => (props.focus ? '#3366FF' : '#ccc')};
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  text-align: left;
  width: 100%;

  ${props =>
    props.isDisabled &&
    css`
      background: #ccc;
    `};

  ${props =>
    props.isValid &&
    css`
      border-color: #33bb66;
    `};

  ${props =>
    props.isValid === false &&
    css`
      border-color: #ff6666;
    `};
`;

const Field = styled(TextInput)`
  background: transparent;
  font-family: inherit;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  line-height: 25px;
  color: #666;
  padding-left: 24px;
  height: 100%;
  width: 280px;

  ::placeholder {
    color: #999;
  }

  &,
  :focus,
  :active,
  :hover {
    border: 0;
    outline: none;
    box-shadow: none;
  }
`;

const Container = styled(View)`
  position: relative;
  margin: 8px 0;
`;

const Input = props => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (props.reset) {
      resetState();
    }
  }, [props.reset]);

  const onChange = event => {
    let numreg = /^[0-9]+$/;

    let valid;
    if (event.length === 0) {
      valid = false;
      setIsValid(null);
    } else if (event === '0' || !numreg.test(event)) {
      valid = false;
      setIsValid(false);
    } else {
      valid = true;
      setIsValid(true);
    }

    props.onChangeHandler({
      value: event,
      name: props.name,
      valid,
    });
  };

  const resetState = () => {
    setIsValid(null);
  };

  const {name, placeholder, keyboard, value, isDisabled} = props;

  return (
    <Container>
      <Wrapper isDisabled={isDisabled} isValid={isValid}>
        <View>
          <Field
            id={`id-${name}`}
            name={name}
            onChangeText={onChange}
            editable={!isDisabled}
            disabled={isDisabled}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboard}
            isValid={isValid}
          />
        </View>
        {isValid && (
          <View>
            <Image
              source={require('../assets/images/check.png')}
              alt="Ícone de sucesso"
              style={{marginTop: 6, marginRight: 24, width: 24}}
              resizeMode="contain"
            />
          </View>
        )}
        {isValid === false && (
          <View>
            <Image
              source={require('../assets/images/error.png')}
              alt="Ícone de erro"
              style={{
                marginTop: 6,
                marginRight: 24,
                width: 24,
                paddingRight: 24,
              }}
              resizeMode="contain"
            />
          </View>
        )}
      </Wrapper>
    </Container>
  );
};

export default Input;

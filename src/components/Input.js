import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import styled, {css} from 'styled-components';

import Image from './Image';
import CheckIcon from '../assets/images/check.png';
import ErrorIcon from '../assets/images/error.png';

const Wrapper = styled(View)`
  background-color: #fff;
  border: solid 2px ${props => (props.focus ? '#3366FF' : '#ccc')};
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  padding: 20px 24px;
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

  > section {
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Label = styled(Text)`
  color: #ccc;
  font-family: inherit;
  font-size: ${props => (props.float ? '12px' : '18px')};
  font-weight: 500;
  font-style: normal;
  line-height: 1.5;
  position: relative;
  top: ${props => (props.float ? '-6px' : '7px')};

  ${props =>
    props.isDisabled &&
    css`
      color: #000;
    `};
`;

const Field = styled(TextInput)`
  background: transparent;
  font-family: inherit;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  line-height: 1.33;
  color: #666;
  padding: 0;

  width: 100%;

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
  const [floating, setIsFloating] = useState(false);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (props.reset) {
      resetState();
    }
  }, [props.reset]);

  const onFocus = () => {
    setIsFloating(true);
  };

  const onChange = event => {
    let valid;
    if (event.target.value.length === 0 || event.target.value === '0') {
      valid = false;
      setIsValid(false);
    } else {
      valid = true;
      setIsValid(true);
    }
    props.onChangeHandler({
      value: event.target.value,
      name: props.name,
      valid,
    });
  };

  const resetState = () => {
    setIsFloating(false);
    setIsValid(null);
  };

  const {name, placeholder, value, isDisabled} = props;

  return (
    <Container>
      <Wrapper isDisabled={isDisabled} isValid={isValid}>
        <View>
          <Label float={floating} isDisabled={isDisabled}>
            {placeholder}
          </Label>
          <Field
            id={`id-${name}`}
            name={name}
            onChange={onChange}
            onFocus={onFocus}
            disabled={isDisabled}
            value={value}
          />
        </View>
        {isValid && (
          <View>
            <Image src={CheckIcon} alt="Ícone de sucesso" />
          </View>
        )}
        {isValid === false && (
          <View>
            <Image src={ErrorIcon} alt="Ícone de erro" />
          </View>
        )}
      </Wrapper>
    </Container>
  );
};

export default Input;

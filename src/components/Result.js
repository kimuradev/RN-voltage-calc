import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  margin-bottom: 8px;
`;

const Label = styled(Text)`
  font-size: 24px;
  color: #33f;
  font-weight: 700;
`;

const Result = props => {
  return (
    <Wrapper>
      <Label>
        <Text>
          Result: {props.result}
          {props.unit}
        </Text>
      </Label>
    </Wrapper>
  );
};

export default Result;

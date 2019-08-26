import styled from 'styled-components';
import {View} from 'react-native';

const WrapperSvg = styled(View)`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  margin-bottom: 8px;

  svg {
    width: 147px;
    height: 160px;
  }
`;

export default WrapperSvg;

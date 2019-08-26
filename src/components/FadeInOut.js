import styled from 'styled-components';
import {View} from 'react-native';

const FadeInOut = styled(View)`
  &.fadeOut {
    opacity: 0;
    position: absolute;
  }
  &.fadeIn {
    opacity: 1;
    position: static;
    transition: opacity 1s linear;
  }
`;

export default FadeInOut;

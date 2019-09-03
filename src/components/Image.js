import styled, {css} from 'styled-components';
import {Image as RNImage} from 'react-native';

const Image = styled(RNImage)`
  ${props =>
    props.center &&
    css`
      display: block;
      margin: 0 auto;
    `};
`;

export default Image;

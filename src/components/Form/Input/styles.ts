import { TextInput } from 'react-native';
import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
    width: 100%;
    padding: 18px 16px;
    background-color: ${({ theme }) => theme.colors.gray800};
    color: ${({ theme }) => theme.colors.light};
    border-radius: 5px;
    margin-bottom: 16px;
    font-size: ${RFValue(16)}px;
`;
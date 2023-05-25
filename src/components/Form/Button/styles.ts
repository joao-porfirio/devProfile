import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
    width: 100%;
    align-items: center;
    padding: 18px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    border-radius: 5px;
    margin-top:${RFValue(16)}px;
`;

export const Title = styled(Text)`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.dark};
`;
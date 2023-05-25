import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import { BackToSignIn, BackToSignInTitle, Container, Content, Icon, Logo, Title } from "./styles";
import { InputControl } from "../../components/Form/InputControl";
import { Platform, ScrollView } from "react-native";
import { Button } from "../../components/Form/Button";
import { KeyboardAvoidingView, Alert } from "react-native";
import logo from '../../assets/logo.png';

interface ScreenNavigationProp {
    goBack: () => void;
    navigate(screen: string): void;
}

interface IFormInputs {
    [name: string]: any;
}

const formSchema = yup.object({
    email: yup.string().email('Email inválido.').required('Informe o email.'),
});

export const ForgotPassword:React.FunctionComponent = () => {
    const {handleSubmit, control, formState: { errors },} = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });
    const {goBack, navigate} = useNavigation<ScreenNavigationProp>();

    const handleForgotPassword = async(form: IFormInputs) => {
        const data = {
            email: form.email,
        };

        try {
            await api.post('password/forgot', data)
            Alert.alert('Email enviado', "Você receberá um e-mail com as instruções para redefinição da senha");
            navigate('ResetPassword');
            
        } catch (error) {
            Alert.alert('Erro no envio de email', "Ocorreu um erro ao enviar o email");
        }
    }

    return (
        <KeyboardAvoidingView 
            enabled 
            style={{flex:1}} 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView 
                keyboardShouldPersistTaps="handled" 
                contentContainerStyle={{ flex: 1 }}
            >
                <Container>
                    <Content>
                        <Logo source={logo}/>
                        <Title>
                            Esqueci minha senha
                        </Title>
                        <InputControl 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            control={control} 
                            name="email" 
                            placeholder="Email" 
                            keyboardType="email-address"
                            error={String(errors.email && errors.email.message)}
                        />
                        <Button title="Enviar" onPress={handleSubmit(handleForgotPassword)} />
                    </Content>
                </Container>
            </ScrollView>
            <BackToSignIn 
                onPress={()=> {
                    goBack();
                }}
            >
                <Icon name="arrow-left" />
                <BackToSignInTitle>Voltar para logon</BackToSignInTitle>
            </BackToSignIn>
        </KeyboardAvoidingView>
    )
}
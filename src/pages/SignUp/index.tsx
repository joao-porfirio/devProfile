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
}

interface IFormInputs {
    [name: string]: any;
}

const formSchema = yup.object({
    name: yup.string().required('Informe o nome completo.'),
    email: yup.string().email('Email inválido.').required('Informe o email.'),
    password: yup.string().required('Informe a senha.'),
});

export const SignUp:React.FunctionComponent = () => {
    const {handleSubmit, control, formState: { errors },} = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });
    const {goBack} = useNavigation<ScreenNavigationProp>();

    const handleSignUp = async(form: IFormInputs) => {
        const data = {
            name: form.name,
            email: form.email,
            password: form.password,
        };

        try {
            await api.post('users', data)
            Alert.alert('Cadastro realizado', "Pode fazer login na aplicação")
        } catch (error) {
            Alert.alert('Erro no cadastro', "Ocorreu um erro")
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
                            Crie sua conta
                        </Title>
                        <InputControl 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            control={control} 
                            name="name" 
                            placeholder="Nome completo" 
                            error={String(errors.name && errors.name.message)}
                        />
                        <InputControl 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            control={control} 
                            name="email" 
                            placeholder="Email" 
                            keyboardType="email-address"
                            error={String(errors.email && errors.email.message)}
                        />
                        <InputControl 
                            control={control} 
                            name="password" 
                            placeholder="Senha" 
                            secureTextEntry
                            error={String(errors.password && errors.password.message)}
                        />
                        <Button title="Criar conta" onPress={handleSubmit(handleSignUp)} />
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
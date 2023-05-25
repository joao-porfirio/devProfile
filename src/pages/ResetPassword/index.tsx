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
    token: yup.string().uuid('Código inválido.').required('Informe o código.'),
    password: yup.string().required('Informe a nova senha.'),
    password_conformation: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Confirmação incorreta.'),
});

export const ResetPassword:React.FunctionComponent = () => {
    const {handleSubmit, control, formState: { errors },} = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });
    const {goBack, navigate} = useNavigation<ScreenNavigationProp>();

    const handleResetPassword = async(form: IFormInputs) => {
        const data = {
            token: form.token,
            password: form.password,
            password_conformation: form.password_conformation,
        };

        try {
            await api.post('password/reset', data)
            Alert.alert('Senha redefinida', "A senha foi redefinida com sucesso. Efetue login para acessar.");
            navigate('SignIn');
        } catch (error) {
            Alert.alert('Ocorreu um erro ao resetar sua senha', "Tente novamente")
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
                            Redefinir a senha
                        </Title>
                        <InputControl 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            control={control} 
                            name="token" 
                            placeholder="Código" 
                            error={String(errors.token && errors.token.message)}
                        />
                        <InputControl 
                            control={control} 
                            name="password" 
                            placeholder="Senha" 
                            secureTextEntry
                            error={String(errors.password && errors.password.message)}
                        />
                         <InputControl 
                            control={control} 
                            name="password_conformation" 
                            placeholder="Senha" 
                            secureTextEntry
                            error={String(errors.password_conformation && errors.password_conformation.message)}
                        />
                        <Button title="Enviar" onPress={handleSubmit(handleResetPassword)} />
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
import React from "react";
import { useForm, FieldValues, Field } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigation } from '@react-navigation/native';
import { Container, Content, CreateAccount, CreateAccountTitle, ForgotPasswordButton, ForgotPasswordTitle, Icon, Logo, Title } from "./styles";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Button } from "../../components/Form/Button";
import logo from '../../assets/logo.png';
import { InputControl } from "../../components/Form/InputControl";
import { useAuth } from "../../context/AuthContext";

interface ScreenNavigationProp {
    navigate: (screen: string) => void;
}

interface IFormInputs {
    [name: string]: any;
}

const formSchema = yup.object({
    email: yup.string().email('Email inválido.').required('Informe o email.'),
    password: yup.string().required('Informe a senha.'),
});

export const SignIn:React.FunctionComponent = () => {
    const {signIn} = useAuth();
    const [loading, setLoading] = React.useState(false);

    const {handleSubmit, control, formState: { errors }, } = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });

    const {navigate} = useNavigation<ScreenNavigationProp>();
    
    const handleSignIn = (form: IFormInputs) => {
        const data = {
            email: form.email,
            password: form.password,
        };
        

        try {
            setLoading(true);
            signIn(data);
        } catch (error) {
            Alert.alert("Erro na autenticação", "Ocorreu um erro no login. Verifique as credenciais")
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
                        <Logo source={logo} />
                        <View>
                            <Title>
                                Faça seu login
                            </Title>
                        </View>
                        <InputControl 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            control={control} 
                            name="email" 
                            placeholder="Email" 
                            keyboardType="email-address"
                            error={String(errors?.email && errors?.email?.message)}
                        />
                        <InputControl 
                            control={control} 
                            name="password" 
                            placeholder="Senha" 
                            secureTextEntry
                            error={String(errors?.password && errors?.password?.message)}
                        />
                        <Button 
                            title="Entrar" 
                            disabled={loading}
                            onPress={handleSubmit(handleSignIn)}
                        />

                        <ForgotPasswordButton onPress={() => navigate('ForgotPassword')}>
                            <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
                        </ForgotPasswordButton>
                    </Content>
                </Container>
            </ScrollView>
            <CreateAccount onPress={()=> {
                    navigate('SignUp');
                }}
            >
                <Icon name="log-in"/>
                <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
            </CreateAccount>
        </KeyboardAvoidingView>
    )
}
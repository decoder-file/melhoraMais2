// import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  ContainerName,
  Name,
  Welcome,
  ButtonExit,
  TitleExit,
  ButtonName,
} from "./styles";

interface WelcomeHeaderProps {
  name: string;
}

export function WelcomeHeader({ name }: WelcomeHeaderProps) {
  // const navigation = useNavigation();

  async function handleSignOut() {
    Alert.alert(
      "Sair",
      "Deseja realmente sair? \nprecisará de internet para conectar-se novamente",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            try {
              signOut();
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]
    );
  }

  const { signOut } = useAuth();

  return (
    <Container>
      <ContainerName>
        <Welcome>Bem-vindo,</Welcome>
        <ButtonName
          activeOpacity={0.8}
          /* onPress={() => navigation.navigate("Profile")}*/
        >
          <Name>{name}</Name>
        </ButtonName>
      </ContainerName>

      <ButtonExit onPress={handleSignOut}>
        <TitleExit>Sair</TitleExit>
      </ButtonExit>
    </Container>
  );
}

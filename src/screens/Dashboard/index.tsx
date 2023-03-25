import React, { useEffect, useState } from "react";

import { showMessage } from "react-native-flash-message";
import { ScrollView, View } from "react-native";

import { useNetInfo } from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";

import { CardCalculation } from "../../components/CardCalculation";
import { WelcomeHeader } from "../../components/WelcomeHeader";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { RootStackParamList } from "../../routes/app.routes";
import { WeatherForecast } from "@components/WeatherForecast";

import {
  Container,
  ButtonAddNewCalculation,
  TitleButtonAddNewCalculation,
  ContainerCard,
  TitleContainerCard,
  NotCalculations,
  ModalExit,
  ModalDeleteCalculation,
  ModalAboutLocation,
} from "./styles";

interface DashboardProps
  extends StackScreenProps<RootStackParamList, "Dashboard"> {}

export function Dashboard({ navigation }: DashboardProps) {
  const { user, signOut } = useAuth();
  const netInfo = useNetInfo();

  const [calculations, setCalculations] = useState<any[]>([]);
  const [currentCalculation, setCurrentCalculation] = useState("");
  const [loadingSignOut, setLoadingSignOut] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDeleteCalculation, setModalDeleteCalculation] = useState(false);
  const [loadingDeleteCalculation, setLoadingDeleteCalculation] =
    useState(false);
  const [modalAboutLocation, setModalAboutLocation] = useState(false);

  const selectCalculation = (id: string) => {
    setCurrentCalculation(id);
  };

  const deleteCalculation = async () => {
    setLoadingDeleteCalculation(true);
    const value = currentCalculation.valueOf();
    api
      .delete(`/calculations/${value}`)
      .then((response) => {
        if (response.status) {
          showMessage({
            message: "Cálculo excluído com sucesso!",
            type: "success",
            icon: "success",
          });
          setLoadingDeleteCalculation(false);
          setModalDeleteCalculation(false);
        }
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description: "Ocorreu para carregar as tag personalizadas",
          type: "danger",
          icon: "danger",
        });
        setLoadingDeleteCalculation(false);
        setModalDeleteCalculation(false);
      });
  };

  const lookingSavedCalculations = async () => {
    api
      .get("/calculations")
      .then((response) => {
        setCalculations(response.data);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description: "Ocorreu para carregar cálculos",
          type: "danger",
          icon: "danger",
        });
      });
  };

  const handleSignOut = async () => {
    setLoadingSignOut(true);
    await signOut();
    setLoadingSignOut(false);
  };

  useEffect(() => {
    lookingSavedCalculations();
  }, [calculations]);

  return (
    <>
      <WelcomeHeader
        name={user?.name.replace(/^\w/, (c) => c.toUpperCase())}
        signOut={() => setModal(true)}
      />
      <Container>
        <View>
          <WeatherForecast
            onPressModalAboutLocation={() => setModalAboutLocation(true)}
            key=""
          />
        </View>
        <ButtonAddNewCalculation
          onPress={() => navigation.navigate("RegisterCalculation")}
        >
          <Ionicons name="add-circle-sharp" size={24} color="black" />
          <TitleButtonAddNewCalculation>
            Realizar novo cálculo
          </TitleButtonAddNewCalculation>
        </ButtonAddNewCalculation>

        <ContainerCard>
          <TitleContainerCard>Cálculos salvos</TitleContainerCard>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {calculations.length > 0 ? (
              calculations.map((e) => (
                <CardCalculation
                  clickCalculationCard={() =>
                    navigation.navigate("RegisterCalculationEdit", { id: e.id })
                  }
                  deleteCalculation={() => {
                    selectCalculation(e.id), setModalDeleteCalculation(true);
                  }}
                  key={e.id}
                  title={e.title}
                  result={e.result}
                  tagId={e.tag}
                />
              ))
            ) : (
              <NotCalculations>Não existe cálculos salvos</NotCalculations>
            )}
          </ScrollView>
        </ContainerCard>
      </Container>

      <ModalExit
        show={modal}
        close={() => setModal(false)}
        cancelButtonText="Cancelar"
        confirmButtonText="Sair"
        onPressConfirmButton={handleSignOut}
        message={
          netInfo.isConnected
            ? "Tem certeza que deseja sair do aplicativo? Todos os dados não salvos serão perdidos."
            : "Desculpe, você parece estar sem conexão com a internet no momento. Se você sair do aplicativo agora, poderá perder quaisquer dados não salvos. Verifique sua conexão com a internet antes de continuar."
        }
        enabledConfirmButton={!loadingSignOut}
        loadingConfirmButton={loadingSignOut}
        enabledCancelButton={!loadingSignOut}
      />

      <ModalDeleteCalculation
        show={modalDeleteCalculation}
        close={() => setModalDeleteCalculation(false)}
        cancelButtonText="Cancelar"
        confirmButtonText="Excluir"
        onPressConfirmButton={deleteCalculation}
        message="Tem certeza que deseja excluir este cálculo? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos."
        enabledConfirmButton={!loadingDeleteCalculation}
        loadingConfirmButton={loadingDeleteCalculation}
        enabledCancelButton={!loadingDeleteCalculation}
      />

      <ModalAboutLocation
        show={modalAboutLocation}
        close={() => setModalAboutLocation(false)}
        message="Temos uma ótima previsão do tempo para você, mas para isso precisamos que você nos conceda acesso à sua localização. Por favor, permita o acesso à sua localização para que possamos exibir a previsão do tempo mais precisa para a sua região. Obrigado!"
        alertModal
        onPressConfirmButton={() => setModalAboutLocation(false)}
      />
    </>
  );
}

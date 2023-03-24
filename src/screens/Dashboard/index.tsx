import React, { useEffect, useState } from "react";

import * as Location from "expo-location";
import { showMessage } from "react-native-flash-message";
import { ScrollView, View } from "react-native";

import { useNetInfo } from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import moment from "moment";

import { CardCalculation } from "../../components/CardCalculation";
import { WelcomeHeader } from "../../components/WelcomeHeader";

import {
  Container,
  ButtonAddNewCalculation,
  TitleButtonAddNewCalculation,
  ContainerCard,
  TitleContainerCard,
  ContainerTemperature,
  LoadingHourly,
  TextLoadingHourly,
  NotCalculations,
  ModalExit,
  ModalDeleteCalculation,
} from "./styles";

import { Temperature } from "../../components/Temperature";

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";

interface CalculationsProps {
  id: string;
  tag: string;
  title: string;
  description: string;
}

interface DashboardProps
  extends StackScreenProps<RootStackParamList, "Dashboard"> {}

export function Dashboard({ navigation }: DashboardProps) {
  const { user, signOut } = useAuth();
  const netInfo = useNetInfo();

  const [isModalVisible, setModalVisible] = useState(false);
  const [hourly, setHourly] = useState<any[]>([]);
  const [loadingHourly, setLoadingHourly] = useState(false);
  const [calculations, setCalculations] = useState<any[]>([]);
  const [locationLat, setLocationLat] = useState(0);
  const [locationLon, setLocationLon] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentCalculation, setCurrentCalculation] = useState("");
  const [loadingSignOut, setLoadingSignOut] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDeleteCalculation, setModalDeleteCalculation] = useState(false);
  const [loadingDeleteCalculation, setLoadingDeleteCalculation] =
    useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let test = await Location.getCurrentPositionAsync({});
      setLocationLat(test.coords.latitude);
      setLocationLon(test.coords.longitude);
    })();
  }, []);

  const weatherApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/3.0",
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectCalculation = (id: string) => {
    setCurrentCalculation(id);
    toggleModal();
  };

  const deleteCalculation = async () => {
    setLoadingDeleteCalculation(true);
    const value = currentCalculation.valueOf();
    api
      .delete(`/calculations/${value}`)
      .then((response) => {
        toggleModal();
        if (response.status) {
          showMessage({
            message: "Cálculo excluído com sucesso!",
            type: "success",
            icon: "success",
          });
          setLoadingDeleteCalculation(false);
          setModalDeleteCalculation(false)
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
        setModalDeleteCalculation(false)
      });
  };

  const weatherForecast = async () => {
    setLoadingHourly(true);
    weatherApi
      .get(
        `/onecall?lat=${locationLat}&lon=${locationLon}&&lang=pt_br&exclude=hourly&units=metric&appid=e60bbbd8743dbd96687926fd211c16f2`
      )
      .then((response) => {
        setHourly(response.data.daily);
        setLoadingHourly(false);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description:
            "Ocorreu um erro inesperado para carregar a previsão do tempo",
          type: "danger",
          icon: "danger",
        });
        setLoadingHourly(false);
      });
  };

  const convertDate = (timestamp: number) => {
    var currentDate = new Date(timestamp * 1000);
    const convertedDate = moment(currentDate).format("DD/MM");
    return convertedDate.toString();
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

  const loadWeatherForecast = () => {
    if (errorMsg.length !== 0) {
      return (
        <TextLoadingHourly>
          A permissão para acessar a localização foi negada
        </TextLoadingHourly>
      );
    } else if (loadingHourly) {
      return (
        <>
          <LoadingHourly size="small" color="#FEC321" />
          <TextLoadingHourly>Carregando Previsão do tempo</TextLoadingHourly>
        </>
      );
    } else if (hourly) {
      return hourly.map((e) => (
        <Temperature
          key={e.dt}
          date={convertDate(e.dt)}
          temp={e.temp.day}
          icon={e.weather.main}
        />
      ));
    } else {
      return "";
    }
  };

  const handleSignOut = async () => {
    setLoadingSignOut(true);
    await signOut();
    setLoadingSignOut(false);
  };

  useEffect(() => {
    weatherForecast();
  }, []);

  useEffect(() => {
    lookingSavedCalculations();
  }, [calculations]);

  return (
    <>
      <WelcomeHeader name={user?.name} signOut={() => setModal(true)} />
      <Container>
        <View>
          <ContainerTemperature>{loadWeatherForecast()}</ContainerTemperature>
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
    </>
  );
}

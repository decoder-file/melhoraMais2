import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";
Yup.setLocale(ptForm);

import { ScrollView, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Header } from "../../components/Header";
import { InputSlider } from "../../components/InputSlider";
import { Input } from "../../components/Input";
import { Tag } from "../../components/Tag";

import { StackScreenProps } from "@react-navigation/stack";

import { api } from "../../services/api";

import { RootStackParamList } from "../../routes/app.routes";

import {
  ButtonHandleSubmit,
  Container,
  ContainerInputSlider,
  ContainerTag,
  TitleTag,
} from "./styles";
import { ShowResult } from "../../components/ShowResult";
import { LoadingScreen } from "@components/LoadingScreen";
import { useNavigation } from "@react-navigation/native";

export interface RegisterCalculationEditProps {
  data: CalculationsProps[];
}

interface RegisterCalculationEditNavigateProps
  extends StackScreenProps<RootStackParamList, "RegisterCalculationEdit"> {}

interface CalculationsProps {
  id: string;
  tag: string;
  title: string;
  description: string;
  bash: string;
  entranceWeight: string;
  dailyCost: string;
  gmd: string;
  purchasePrice: string;
  lengthOfStay: string;
  outputWeight: string;
  rcInitial: string;
  rcEnd: string;
  salePrice: string;
  producedPrice: string;
  returnOnCapital: string;
  result: string;
  updated_at: string;
}

interface TagProps {
  title: string;
  color: string;
}

export function RegisterCalculationEdit({
  route,
}: RegisterCalculationEditNavigateProps) {
  const navigation = useNavigation();
  
  const [selectTagId, setSelectTagId] = useState("");
  const [selectTagList, setSelectTagList] = useState({} as TagProps);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loadingTag, setLoadingTag] = useState(true);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [entryWeight, setEntryWeight] = useState(0);
  const [dailyCost, setDailyCost] = useState(0);
  const [priceAtPurchase, setPriceAtPurchase] = useState(0);
  const [gmd, setGmd] = useState(0);
  const [timeOfStay, setTimeOfStay] = useState(0);
  const [outputWeight, setOutputWeight] = useState(0);
  const [rcInitial, setRcInitial] = useState(0);
  const [rcFinal, setRcFinal] = useState(0);
  const [atSalePrice, setAtSalePrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [priceAtProduced, setPriceAtProduced] = useState(0);
  const [returnOnCapital, setReturnOnCapital] = useState(0);
  const [result, setResult] = useState(0);
  const [bash, setBash] = useState(0);
  const [description, setDescription] = useState(0);

  const calculationsSearch = async () => {
    setLoadingScreen(true);
    const value = route.params.data[0];
    const [dailyCostNumber, priceAtPurchaseNumber] = value.dailyCost.split("-");
    setTitle(value.title);
    setEntryWeight(parseFloat(value.entranceWeight));
    setDailyCost(parseFloat(dailyCostNumber));
    setPriceAtPurchase(parseFloat(priceAtPurchaseNumber));
    setGmd(parseFloat(value.gmd));
    setTimeOfStay(parseFloat(value.lengthOfStay));
    setOutputWeight(parseFloat(value.outputWeight));
    setRcInitial(parseFloat(value.rcInitial));
    setRcFinal(parseFloat(value.rcEnd));
    setAtSalePrice(parseFloat(value.salePrice));
    setPurchasePrice(parseFloat(value.purchasePrice));
    setPriceAtProduced(parseFloat(value.producedPrice));
    setReturnOnCapital(parseFloat(value.returnOnCapital));
    setResult(parseFloat(value.result));
    setBash(parseFloat(value.bash));
    setDescription(parseFloat(value.description));
    setSelectTagId(value.tag);
    setLoadingScreen(false);
  };

  const tagSearch = async () => {
    setLoadingTag(true);
    if (selectTagId.length > 0) {
      api
        .get(`/tag-calculations/${selectTagId}`)
        .then((response) => {
          setSelectTagList(response.data);
          setLoadingTag(false);
        })
        .catch((err) => {
          showMessage({
            message: "Error!",
            description: "Ocorreu para carregar as tag",
            type: "danger",
            icon: "danger",
          });
        });
    }
    setLoadingTag(false);
  };

  async function handleSubmit() {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required("Campo título é obrigatório"),
        entryWeight: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo peso de entrada é obrigatório"),
        dailyCost: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo custo diário é obrigatório"),
        priceAtPurchase: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo preço @ compra é obrigatório"),
        gmd: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo GMD é obrigatório"),
        timeOfStay: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo tempo Permanência é obrigatório"),
        rcInitial: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo RC final é obrigatório"),
        rcFinal: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo RC final é obrigatório"),
        atSalePrice: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo preço @ de venda é obrigatório"),
      });

      await schema.validate({
        title,
        entryWeight,
        dailyCost,
        priceAtPurchase,
        gmd,
        timeOfStay,
        rcInitial,
        rcFinal,
        atSalePrice,
      });
      const sendValue = {
        tag: selectTagId,
        title: title,
        description: description.toString(),
        bash: bash.toString(),
        entranceWeight: entryWeight.toString(),
        dailyCost: `${dailyCost.toString()}-${priceAtPurchase}`,
        gmd: gmd.toString(),
        purchasePrice: purchasePrice.toString(),
        lengthOfStay: timeOfStay.toString(),
        outputWeight: outputWeight.toString(),
        rcInitial: rcInitial.toString(),
        rcEnd: rcFinal.toString(),
        salePrice: atSalePrice.toString(),
        producedPrice: priceAtProduced.toString(),
        returnOnCapital: returnOnCapital.toString(),
        result: result.toString(),
      };
      await api.patch(`/calculations/${route.params.data[0].id}`, sendValue);
      showMessage({
        message: "Sucesso!",
        description: "Cálculo atualizado com sucesso!",
        type: "success",
        icon: "success",
      });
      navigation.navigate("Dashboard");
      setLoading(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showMessage({
          message: "Ops!",
          description: error.message,
          type: "danger",
        });
        setLoading(false);
      } else {
        showMessage({
          message: "Error na autenticação",
          description:
            "Ocorreu um erro ao atualizar cálculo, tente novamente mais tarde!",
          type: "danger",
        });
        setLoading(false);
      }
    }
    setLoading(false);
  }

  const handleChangePriceAtProduced = async () => {
    const calc = (dailyCost * timeOfStay) / bash;
    await setPriceAtProduced(parseFloat(calc.toFixed(2)));
  };

  const handleChangePurchasePrice = async () => {
    const calc = ((entryWeight * (rcInitial / 100)) / 15) * priceAtPurchase;
    await setPurchasePrice(calc);
  };

  const handleChangeAmountOfAtProduced = async () => {
    const calc =
      (outputWeight * (rcFinal / 100) - entryWeight * (rcInitial / 100)) / 15;
    await setBash(parseFloat(calc.toFixed(2)));
  };

  const handleChangeSalePrice = async () => {
    const calc = ((outputWeight * (rcFinal / 100)) / 15) * atSalePrice;
    await setDescription(calc);
  };

  const handleChangeReturnOnCapital = async () => {
    const calc =
      ((result / (purchasePrice + dailyCost * timeOfStay)) * 100) /
      (timeOfStay / 30.41);
    await setReturnOnCapital(parseFloat(calc.toFixed(2)));
  };

  const handleChangeResult = async () => {
    const calc = description - (dailyCost * timeOfStay + purchasePrice);
    await setResult(calc);
  };

  const handleChangeOutputWeight = async () => {
    const calc = (gmd * timeOfStay) / 1000 + entryWeight;
    await setOutputWeight(calc);
  };

  useEffect(() => {
    handleChangeSalePrice();
    handleChangeReturnOnCapital();
    handleChangeResult();
    handleChangePriceAtProduced();
    handleChangePurchasePrice();
    handleChangeAmountOfAtProduced();
    handleChangeOutputWeight();
  }, [
    dailyCost,
    timeOfStay,
    entryWeight,
    rcInitial,
    priceAtPurchase,
    outputWeight,
    rcFinal,
    atSalePrice,
    purchasePrice,
    description,
    result,
  ]);

  useEffect(() => {
    tagSearch();
  }, [selectTagId]);

  useEffect(() => {
    calculationsSearch();
  }, [route.params.data]);

  return (
    <>
      <Header title="Editar cálculo" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        {!loadingScreen && !loadingTag ? (
          <Container>
            {selectTagId && (
              <>
                <TitleTag>Etiqueta:</TitleTag>
                <ContainerTag>
                  {selectTagList && (
                    <Tag
                      title={selectTagList.title}
                      color={selectTagList.color}
                    />
                  )}
                </ContainerTag>
              </>
            )}
            <Input
              title="Título"
              placeholder="Título"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              onChangeText={setTitle}
              value={title}
            />
            <View style={{ marginTop: 10 }} />
            <InputSlider
              title="Peso de entrada(Kg)"
              placeholder="Peso de entrada"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) =>
                setEntryWeight(e.length === 0 ? 0 : parseFloat(e))
              }
              value={entryWeight.toString()}
              sliderValue={(value) => setEntryWeight(value)}
              isSlide
              inputValue={entryWeight}
            />
            <InputSlider
              title="Custo diário(R$)"
              placeholder="Custo diário"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) =>
                setDailyCost(e.length === 0 ? 0 : parseFloat(e))
              }
              value={dailyCost.toString()}
              sliderValue={(value) => setDailyCost(value)}
              isSlide
              inputValue={dailyCost}
            />

            <InputSlider
              title="Preço @ compra(R$)"
              placeholder="Preço"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) =>
                setPriceAtPurchase(e.length === 0 ? 0 : parseFloat(e))
              }
              value={priceAtPurchase.toString()}
              sliderValue={(value) => setPriceAtPurchase(value)}
              isSlide
              inputValue={priceAtPurchase}
            />
            <InputSlider
              title="GMD(g)"
              placeholder="GMD"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) => setGmd(e.length === 0 ? 0 : parseFloat(e))}
              value={gmd.toString()}
              sliderValue={(value) => setGmd(value)}
              isSlide
              inputValue={gmd}
            />

            <InputSlider
              title="Tempo Permanência(dias)"
              placeholder="Tempo Permanência"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) =>
                setTimeOfStay(e.length === 0 ? 0 : parseFloat(e))
              }
              value={timeOfStay.toString()}
              sliderValue={(value) => setTimeOfStay(value)}
              isSlide
              inputValue={timeOfStay}
            />

            <ShowResult title="Peso de saída(Kg)" label={outputWeight} />

            <View style={{ marginTop: 10 }} />

            <InputSlider
              title="RC inicial(%)"
              placeholder="RC inicial"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) =>
                setRcInitial(e.length === 0 ? 0 : parseFloat(e))
              }
              value={rcInitial.toString()}
              sliderValue={(value) => setRcInitial(value)}
              isSlide
              inputValue={rcInitial}
            />
            <InputSlider
              title="RC final(%)"
              placeholder="RC final"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) =>
                setRcFinal(e.length === 0 ? 0 : parseFloat(e))
              }
              value={rcFinal.toString()}
              sliderValue={(value) => setRcFinal(value)}
              isSlide
              inputValue={rcFinal}
            />

            <InputSlider
              title="Preço @ de venda(R$)"
              placeholder="Preço @"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) =>
                setAtSalePrice(e.length === 0 ? 0 : parseFloat(e))
              }
              value={atSalePrice.toString()}
              sliderValue={(value) => setAtSalePrice(value)}
              isSlide
              inputValue={atSalePrice}
            />

            <ShowResult
              title="Preço @ produzida(R$)"
              label={priceAtProduced}
              isMoney
            />
            <ShowResult
              title="Valor de compra(R$)"
              label={purchasePrice}
              isMoney
            />

            <ShowResult title="Quantidade de @ Produzidas" label={bash} />
            <ShowResult
              title="Preço de venda(R$)"
              label={description}
              isMoney
            />

            <ShowResult
              title="Rendimento do capital(%)"
              label={returnOnCapital}
            />

            <ShowResult title="Resultado" label={result} isMoney />

            <ButtonHandleSubmit
              title="Salvar Alteração"
              onPress={handleSubmit}
              enabled={!loading}
              loading={loading}
            />
          </Container>
        ) : (
          <LoadingScreen />
        )}
      </ScrollView>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Header } from "../../components/Header";
import { InputSlider } from "../../components/InputSlider";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Tag } from "../../components/Tag";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Container,
  ContainerInputSlider,
  ContainerTag,
  TitleTag,
  ButtonAddTag,
  TitleButtonTag,
} from "./styles";
import {api} from "../../services/api";
import { ShowResult } from "../../components/ShowResult";

const RegisterCalculationSchema = Yup.object().shape({
  title: Yup.string().min(4).required("Campo obrigatório"),

  entryWeight: Yup.number().required("Campo obrigatório"),
  dailyCost: Yup.number().required("Campo obrigatório"),

  priceAtPurchase: Yup.number().required("Campo obrigatório"),
  gmd: Yup.number().required("Campo obrigatório"),

  timeOfStay: Yup.number().required("Campo  obrigatório"),
  outputWeight: Yup.number().required("Campo obrigatório"),

  rcInitial: Yup.number().required("Campo obrigatório"),
  rcFinal: Yup.number().required("Campo obrigatório"),

  atSalePrice: Yup.number().required("Campo obrigatório"),
  purchasePrice: Yup.number().required("Campo obrigatório"),

  priceAtProduced: Yup.number().required("Campo obrigatório"),
  returnOnCapital: Yup.number().required("Campo obrigatório"),

  result: Yup.number().required("Campo Resultado obrigatório"),

  bash: Yup.number().required("Campo obrigatório"),
  description: Yup.number().required("Campo obrigatório"),
});

export function RegisterCalculation() {
  const navigation = useNavigation();
  const [listTag, setListTag] = useState<any[]>([]);
  const [selectTag, setSelectTag] = useState("");

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

  const handleTag = (id: string) => {
    setSelectTag(id);
  };

  const tagSearch = async () => {
    api
      .get("/tag-calculations")
      .then((response) => {
        setListTag(response.data);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description: "Ocorreu para carregar as tag personalizadas",
          type: "danger",
          icon: "danger",
        });
      });
  };

  const submitCalculations = async (value: object) => {
    api.post("/calculations", value);
  };

  useEffect(() => {
    tagSearch();
  }, [listTag]);

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: RegisterCalculationSchema,
      initialValues: {
        title: "",
        entryWeight: 0,
        dailyCost: 0,
        priceAtPurchase: 0,
        gmd: 0,
        timeOfStay: 0,
        outputWeight: 0,
        rcInitial: 0,
        rcFinal: 0,
        atSalePrice: 0,
        purchasePrice: 0,
        priceAtProduced: 0,
        returnOnCapital: 0,
        result: 0,
        bash: 0,
        description: 0,
      },
      onSubmit: async (v) => {
        try {
          const sendValue = {
            tag: selectTag,
            title: v.title,
            description: description.toString(),
            bash: bash.toString(),
            entranceWeight: entryWeight.toString(),
            dailyCost: dailyCost.toString(),
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

          await submitCalculations(sendValue);
          showMessage({
            message: "Sucesso!",
            description: "Cálculo criado com sucesso!",
            type: "success",
            icon: "success",
          });
          navigation.navigate("Dashboard");
        } catch (err: any) {
          showMessage({
            message: "Erro no login",
            description:
              "Ocorreu um erro inesperado. Tente novamente mais tarde!",
            type: "danger",
            icon: "danger",
          });
        }
      },
    });

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

  useEffect(() => {
    handleChangeSalePrice();
    handleChangeReturnOnCapital();
    handleChangeResult();
    handleChangePriceAtProduced();
    handleChangePurchasePrice();
    handleChangeAmountOfAtProduced();
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

  return (
    <>
      <Header title="Novo cálculo" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          <TitleTag>Etiquetas</TitleTag>
          <ContainerTag>
            {listTag &&
              listTag.map((e) => (
                <Tag
                  key={e.id}
                  title={e.title}
                  color={e.color}
                  onPress={() => handleTag(e.id)}
                  id={e.id}
                  selectId={selectTag}
                />
              ))}
          </ContainerTag>
          <ButtonAddTag onPress={() => navigation.navigate("CreateTag")}>
            <TitleButtonTag>Criar nova etiqueta</TitleButtonTag>
          </ButtonAddTag>
          <Input
            title="Título"
            placeholder="Título"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
            onBlur={handleBlur("title")}
            onChangeText={handleChange("title")}
            error={errors.title && touched.title && errors.title}
            value={values.title}
          />
          <ContainerInputSlider>
            <InputSlider
              title="Peso de entrada(Kg)"
              placeholder="Peso de entrada"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("entryWeight")}
              onChangeText={(e) => setEntryWeight(e)}
              error={
                errors.entryWeight && touched.entryWeight && errors.entryWeight
              }
              value={entryWeight.toString()}
              sliderValue={(value) => {
                setEntryWeight((prev) => prev + 1);
              }}
              isSlide
            />
            <InputSlider
              title="Custo diario(R$)"
              placeholder="Custo diário"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("dailyCost")}
              onChangeText={(e) => setDailyCost(e)}
              error={errors.dailyCost && touched.dailyCost && errors.dailyCost}
              value={dailyCost.toString()}
              sliderValue={(value) => {
                setDailyCost((prev) => prev + 1);
              }}
              isSlide
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="Preço @ compra(R$)"
              placeholder="Preço"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("priceAtPurchase")}
              onChangeText={(e) => setPriceAtPurchase(e)}
              error={
                errors.priceAtPurchase &&
                touched.priceAtPurchase &&
                errors.priceAtPurchase
              }
              value={priceAtPurchase.toString()}
              sliderValue={(value) => {
                setPriceAtPurchase((prev) => prev + 1);
              }}
              isSlide
            />
            <InputSlider
              title="GMD(g)"
              placeholder="GMD"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("gmd")}
              onChangeText={(e) => setGmd(e)}
              error={errors.gmd && touched.gmd && errors.gmd}
              value={gmd.toString()}
              sliderValue={(value) => {
                setGmd((prev) => prev + 1);
              }}
              isSlide
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="Tempo Permanência(dias)"
              placeholder="Tempo Permanência"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("timeOfStay")}
              onChangeText={(e) => setTimeOfStay(e)}
              error={
                errors.timeOfStay && touched.timeOfStay && errors.timeOfStay
              }
              value={timeOfStay.toString()}
              sliderValue={(value) => {
                setTimeOfStay((prev) => prev + 1);
              }}
              isSlide
            />
            <InputSlider
              title="Peso de saída(Kg)"
              placeholder="Peso de saída"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("outputWeight")}
              onChangeText={(e) => setOutputWeight(e)}
              error={
                errors.outputWeight &&
                touched.outputWeight &&
                errors.outputWeight
              }
              value={outputWeight.toString()}
              sliderValue={(value) => {
                setOutputWeight((prev) => prev + 1);
              }}
              isSlide
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="RC inicial(%)"
              placeholder="RC inicial"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("rcInitial")}
              onChangeText={(e) => setRcInitial(e)}
              error={errors.rcInitial && touched.rcInitial && errors.rcInitial}
              value={rcInitial.toString()}
              sliderValue={(value) => {
                setRcInitial((prev) => prev + 1);
              }}
              isSlide
            />
            <InputSlider
              title="RC final(%)"
              placeholder="RC final"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("rcFinal")}
              onChangeText={(e) => setRcFinal(e)}
              error={errors.rcFinal && touched.rcFinal && errors.rcFinal}
              value={rcFinal.toString()}
              sliderValue={(value) => {
                setRcFinal((prev) => prev + 1);
              }}
              isSlide
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <ShowResult
              title="Preço @ produzida(R$)"
              label={priceAtProduced}
              isMoney
            />
            <ShowResult title="Valor de compra(R$)" label={purchasePrice} />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <ShowResult title="Quantidade de @ Produzidas" label={bash} />
            <ShowResult
              title="Preço de venda(R$)"
              label={description}
              isMoney
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="Preço @ de venda(R$)"
              placeholder="Preço @"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onBlur={handleBlur("atSalePrice")}
              onChangeText={(e) => setAtSalePrice(e)}
              error={
                errors.atSalePrice && touched.atSalePrice && errors.atSalePrice
              }
              value={atSalePrice.toString()}
              sliderValue={(value) => {
                setRcFinal((prev) => prev + 1);
              }}
              isSlide
            />

            <ShowResult
              title="Rendimento do capital(%)"
              label={returnOnCapital}
            />
          </ContainerInputSlider>
          <ShowResult title="Resultado" label={result} isMoney isWidth />

          <Button
            title="Salvar"
            marginTop={30}
            onPress={() => handleSubmit()}
          />
        </Container>
      </ScrollView>
    </>
  );
}

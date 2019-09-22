import React, {useState} from 'react';
import {View, Image, SafeAreaView, ScrollView} from 'react-native';

import Input from '../components/Input';
import Button from '../components/Button';
import Result from '../components/Result';
import Container from '../components/Container';
import FadeIn from '../components/FadeIn';

const getInitialData = () => {
  return {
    vin: {value: '', isValid: null},
    vout: {value: '', isValid: null},
    r1: {value: '', isValid: null},
    r2: {value: '', isValid: null},
  };
};

export default function Home() {
  const [data, setData] = useState(getInitialData(), null);
  const [result, setResult] = useState(0);
  const [unit, setUnit] = useState('');
  const [calculated, setCalculated] = useState(false);
  const [resetField, setResetField] = useState(false);

  const onChangeHandler = event => {
    setData({
      ...data,
      [event.name]: {
        value: event.value,
        isValid: event.valid,
      },
    });
  };

  const onClickClear = () => {
    setData(getInitialData());
    setResult(0);
    setUnit('');
    setResetField(true);
    setCalculated(false);
  };

  const onClickCalculate = () => {
    setCalculated(true);
    setResetField(false);

    // calcular resistor de entrada -> I = O * (R1 + R2) / R2
    if (data.r1.isValid && data.r2.isValid && data.vout.isValid) {
      setResult(
        (parseFloat(data.vout.value) *
          (parseFloat(data.r1.value) + parseFloat(data.r2.value))) /
          parseFloat(data.r2.value),
      );
      setUnit(' volts');
    }
    // calcular resistor 1 -> R1 = (I * R2 / O) - R2
    else if (data.vin.isValid && data.r2.isValid && data.vout.isValid) {
      setResult(
        (parseFloat(data.vin.value) * parseFloat(data.r2.value)) /
          parseFloat(data.vout.value) -
          parseFloat(data.r2.value),
      );
      setUnit(' ohms');
    }
    // calcular resistor 2 -> R2 = O * R1 / (I - O)
    else if (data.r1.isValid && data.vin.isValid && data.vout.isValid) {
      setResult(
        (parseFloat(data.vout.value) * parseFloat(data.r1.value)) /
          (parseFloat(data.vin.value) - parseFloat(data.vout.value)),
      );
      setUnit(' ohms');
    }
    //calcular resistor de saída ->  O = I * R2 / (R1 + R2)
    else if (data.r1.isValid && data.r2.isValid && data.vin.isValid) {
      setResult(
        (parseFloat(data.vin.value) * parseFloat(data.r2.value)) /
          (parseFloat(data.r1.value) + parseFloat(data.r2.value)),
      );
      setUnit(' volts');
    }
  };

  const isButtonDisabled = () => {
    if (
      data.r1.isValid === false ||
      data.r2.isValid === false ||
      data.vin.isValid === false ||
      data.vout.isValid === false
    ) {
      return true;
    }
    // calcular resistor de entrada -> I = O * (R1 + R2) / R2
    else if (data.r1.isValid && data.r2.isValid && data.vout.isValid) {
      return false;
    }
    // calcular resistor 1 -> R1 = (I * R2 / O) - R2
    else if (data.vin.isValid && data.r2.isValid && data.vout.isValid) {
      return false;
    }
    // calcular resistor 2 -> R2 = O * R1 / (I - O)
    else if (data.r1.isValid && data.vin.isValid && data.vout.isValid) {
      return false;
    }
    //calcular resistor de saída ->  O = I * R2 / (R1 + R2)
    else if (data.r1.isValid && data.r2.isValid && data.vin.isValid) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: '#f0f0f0',
      }}>
      <ScrollView
        style={{
          display: 'flex',
          flex: 1,
        }}>
        <Container>
          <View
            style={{
              backgroundColor: '#d9d9d9',
              borderRadius: 10,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}>
            <Input
              name="vin"
              placeholder="Voltage IN (volts)"
              onChangeHandler={onChangeHandler}
              value={data.vin.value}
              isDisabled={
                data.r1.isValid && data.r2.isValid && data.vout.isValid
              }
              reset={resetField}
              keyboard="numeric"
            />
            <Input
              name="r1"
              placeholder="Resistor 1 (ohms)"
              onChangeHandler={onChangeHandler}
              value={data.r1.value}
              isDisabled={
                data.vin.isValid && data.r2.isValid && data.vout.isValid
              }
              reset={resetField}
              keyboard="numeric"
            />
            <Input
              name="r2"
              placeholder="Resistor 2 (ohms)"
              onChangeHandler={onChangeHandler}
              value={data.r2.value}
              isDisabled={
                data.vin.isValid && data.r1.isValid && data.vout.isValid
              }
              reset={resetField}
              keyboard="numeric"
            />
            <Input
              name="vout"
              placeholder="Voltage OUT (volts)"
              onChangeHandler={onChangeHandler}
              value={data.vout.value}
              isDisabled={
                data.vin.isValid && data.r1.isValid && data.r2.isValid
              }
              reset={resetField}
              keyboard="numeric"
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {!calculated ? (
              <Image
                source={require('../assets/images/voltage.webp')}
                style={{minHeight: 100, maxHeight: 160}}
                resizeMode="contain"
              />
            ) : (
              <FadeIn>
                <Result result={result} unit={unit} />
              </FadeIn>
            )}
          </View>

          <View>
            {!calculated ? (
              <Button
                title="Calculate"
                schema="primary"
                onPress={onClickCalculate}
                disabled={isButtonDisabled()}>
                CALCUTE
              </Button>
            ) : (
              <Button
                title="Clear"
                schema="secondary"
                onPress={onClickClear}
                disabled={isButtonDisabled()}>
                CLEAR
              </Button>
            )}
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

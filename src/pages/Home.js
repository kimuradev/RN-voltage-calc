import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Image} from 'react-native';

import Input from '../components/Input';
import Button from '../components/Button';
import Result from '../components/Result';
import Container from '../components/Container';
import FadeIn from '../components/FadeIn';

const getInitialData = () => {
  return {
    vin: {value: '', isValid: false},
    vout: {value: '', isValid: false},
    r1: {value: '', isValid: false},
    r2: {value: '', isValid: false},
  };
};

export default function Home() {
  const [data, setData] = useState(getInitialData(), null);
  const [isLoading, setIsLoading] = useState(false);
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
    console.log('clicou');
    setIsLoading(true);
    setCalculated(true);
    setResetField(false);

    // calcular resistor de entrada -> I = O * (R1 + R2) / R2
    if (
      data.r1.value !== '' &&
      data.r1.value !== null &&
      (data.r2.value !== '' && data.r2.value !== null) &&
      (data.vout.value !== '' && data.vout.value !== null)
    ) {
      setResult(
        (parseFloat(data.vout.value) *
          (parseFloat(data.r1.value) + parseFloat(data.r2.value))) /
          parseFloat(data.r2.value),
      );
      setUnit(' volts');
    }
    // calcular resistor 1 -> R1 = (I * R2 / O) - R2
    else if (
      data.vin.value !== '' &&
      data.vin.value !== null &&
      (data.r2.value !== '' && data.r2.value !== null) &&
      (data.vout.value !== '' && data.vout.value !== null)
    ) {
      setResult(
        (parseFloat(data.vin.value) * parseFloat(data.r2.value)) /
          parseFloat(data.vout.value) -
          parseFloat(data.r2.value),
      );
      setUnit(' ohms');
    }
    // calcular resistor 2 -> R2 = O * R1 / (I - O)
    else if (
      data.r1.value !== '' &&
      data.r1.value !== null &&
      (data.vin.value !== '' && data.vin.value !== null) &&
      (data.vout.value !== '' && data.vout.value !== null)
    ) {
      setResult(
        (parseFloat(data.vout.value) * parseFloat(data.r1.value)) /
          (parseFloat(data.vin.value) - parseFloat(data.vout.value)),
      );
      setUnit(' ohms');
    }
    //calcular resistor de saída ->  O = I * R2 / (R1 + R2)
    else if (
      data.r1.value !== '' &&
      data.r1.value !== null &&
      (data.r2.value !== '' && data.r2.value !== null) &&
      (data.vin.value !== '' && data.vin.value !== null)
    ) {
      setResult(
        (parseFloat(data.vin.value) * parseFloat(data.r2.value)) /
          (parseFloat(data.r1.value) + parseFloat(data.r2.value)),
      );
      setUnit(' volts');
    }

    setIsLoading(false);
  };

  const isButtonDisabled = () => {
    // calcular resistor de entrada -> I = O * (R1 + R2) / R2
    if (
      data.r1.value !== '' &&
      data.r1.value !== null &&
      (data.r2.value !== '' && data.r2.value !== null) &&
      (data.vout.value !== '' && data.vout.value !== null)
    ) {
      return false;
    }
    // calcular resistor 1 -> R1 = (I * R2 / O) - R2
    else if (
      data.vin.value !== '' &&
      data.vin.value !== null &&
      (data.r2.value !== '' && data.r2.value !== null) &&
      (data.vout.value !== '' && data.vout.value !== null)
    ) {
      return false;
    }
    // calcular resistor 2 -> R2 = O * R1 / (I - O)
    else if (
      data.r1.value !== '' &&
      data.r1.value !== null &&
      (data.vin.value !== '' && data.vin.value !== null) &&
      (data.vout.value !== '' && data.vout.value !== null)
    ) {
      return false;
    }
    //calcular resistor de saída ->  O = I * R2 / (R1 + R2)
    else if (
      data.r1.value !== '' &&
      data.r1.value !== null &&
      (data.r2.value !== '' && data.r2.value !== null) &&
      (data.vin.value !== '' && data.vin.value !== null)
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Container>
      <Input
        name="vin"
        placeholder="Voltage IN (volts)"
        onChangeHandler={onChangeHandler}
        value={data.vin.value}
        isDisabled={data.r1.isValid && data.r2.isValid && data.vout.isValid}
        reset={resetField}
        keyboard="numeric"
      />
      <Input
        name="r1"
        placeholder="Resistor 1 (ohms)"
        onChangeHandler={onChangeHandler}
        value={data.r1.value}
        isDisabled={data.vin.isValid && data.r2.isValid && data.vout.isValid}
        reset={resetField}
        keyboard="numeric"
      />
      <Input
        name="r2"
        placeholder="Resistor 2 (ohms)"
        onChangeHandler={onChangeHandler}
        value={data.r2.value}
        isDisabled={data.vin.isValid && data.r1.isValid && data.vout.isValid}
        reset={resetField}
        keyboard="numeric"
      />
      <Input
        name="vout"
        placeholder="Voltage OUT (volts)"
        onChangeHandler={onChangeHandler}
        value={data.vout.value}
        isDisabled={data.vin.isValid && data.r1.isValid && data.r2.isValid}
        reset={resetField}
        keyboard="numeric"
      />

      {!calculated ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/images/voltage.png')}
            style={{height: 140}}
            resizeMode="contain"
          />
        </View>
      ) : (
        <FadeIn>
          <Result result={result} unit={unit} />
        </FadeIn>
      )}

      <Button
        title="Calculate"
        onPress={!calculated ? onClickCalculate : onClickClear}
        disabled={isButtonDisabled()}>
        {!calculated ? 'CALCUTE' : 'CLEAR'}
      </Button>
    </Container>
  );
}

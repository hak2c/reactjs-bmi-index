import { useState } from "react";
import HeightParams from "./HeightParams";
import WeightParams from "./WeightParams";
import CalculateBmiIndex from "./CalculateBmiIndex";
import PrintResult from "./PrintResult";
import "./styles.css";

const CM_TO_FT = 3.2808; // https://www.metric-conversions.org/length/meters-to-feet.htm
const FT_TO_INCH = 12;
const KG_TO_STONE = 0.157473044; //https://www.thecalculatorsite.com/conversions/common/kg-to-stones-pounds.php
const STONE_TO_LB = 0.0714285714; //https://www.metric-conversions.org/weight/pounds-to-stones.htm

export default function App() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [inches, setInches] = useState(0);
  const [pounds, setPounds] = useState(0);
  const [heightUnit, setHeightUnit] = useState("cm"); // cm: centimet, ft: feet
  const [weightUnit, setWeightUnit] = useState("kg"); // kg: kilogram, lb: pounds
  const [bmi, setBmi] = useState(0);

  function setValue(value, key) {
    value = Number(value);
    if (isNaN && value > 0) {
      key === "height"
        ? setHeight(value)
        : key === "weight"
        ? setWeight(value)
        : key === "inches"
        ? setInches(value)
        : setPounds(value);
    }
  }
  function switchHeightUnit() {
    if (height > 0) {
      let currentHeight = height;
      if (heightUnit === "cm") {
        currentHeight = (currentHeight / 100) * CM_TO_FT;
        setHeight(currentHeight - (currentHeight % 1));
        setInches(Math.round((currentHeight % 1) * FT_TO_INCH));
      } else {
        let currentInch = inches;
        let ftParams = currentHeight + currentInch / FT_TO_INCH;
        setHeight(Math.round((ftParams / CM_TO_FT) * 100));
      }
    }
    heightUnit === "cm" ? setHeightUnit("ft") : setHeightUnit("cm");
  }

  function switchWeightUnit() {
    if (weight > 0) {
      let currentWeight = weight;
      if (weightUnit === "kg") {
        currentWeight = currentWeight * KG_TO_STONE;
        setWeight(currentWeight - (currentWeight % 1));
        setPounds(Math.round((currentWeight % 1) / STONE_TO_LB));
      } else {
        let currentPounds = pounds;
        let lbParams = currentWeight + currentPounds * STONE_TO_LB;
        setWeight(Math.round(lbParams / KG_TO_STONE));
      }
    }
    weightUnit === "kg" ? setWeightUnit("lb") : setWeightUnit("kg");
  }

  function exchangeHeightUnit() {
    let currentHeight = height + inches / FT_TO_INCH;
    return currentHeight / CM_TO_FT;
  }

  function exchangeWeightValue() {
    let currentWeight = weight + pounds * STONE_TO_LB;
    return currentWeight / KG_TO_STONE;
  }

  function calculate() {
    let calHeight = heightUnit === "ft" ? exchangeHeightUnit() : height / 100;
    let calWeight = weightUnit === "lb" ? exchangeWeightValue() : weight;
    setBmi(Number((calWeight / calHeight ** 2).toFixed(2)));
  }

  function resetParams() {
    setHeight(0);
    setInches(0);
    setWeight(0);
    setPounds(0);
    setBmi(0);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="bmiIndex">
          <div className="bmiIndex--heading">BMI calculator</div>
          {bmi === 0 ? (
            <div className="bmiIndex--content">
              <HeightParams
                height={height}
                heightUnit={heightUnit}
                inches={inches}
                switchHeightUnit={switchHeightUnit}
                setValue={setValue}
              />
              <WeightParams
                weight={weight}
                weightUnit={weightUnit}
                pounds={pounds}
                switchWeightUnit={switchWeightUnit}
                setValue={setValue}
              />
              <CalculateBmiIndex
                height={height}
                weight={weight}
                calculate={calculate}
                resetParams={resetParams}
              />
            </div>
          ) : (
            <div className="bmiIndex--content">
              <PrintResult
                bmi={bmi}
                height={height}
                weight={weight}
                heightUnit={heightUnit}
                weightUnit={weightUnit}
                exchangeHeightUnit={exchangeHeightUnit}
                exchangeWeightValue={exchangeWeightValue}
                resetParams={resetParams}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

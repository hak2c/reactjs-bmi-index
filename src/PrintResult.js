import normal from "./images/normal.png";
import obese from "./images/obese.png";
import overweight from "./images/overweight.png";
import underweight from "./images/underweight.png";
const KG_TO_STONE = 0.157473044;
const STONE_TO_LB = 0.0714285714;
export default function PrintResult({
  bmi,
  height,
  weight,
  heightUnit,
  weightUnit,
  exchangeHeightUnit,
  exchangeWeightValue,
  resetParams
}) {
  const imgSrc =
    bmi < 18.5
      ? underweight
      : bmi >= 18.5 && bmi < 25
      ? normal
      : bmi >= 25 && bmi < 30
      ? overweight
      : obese;
  const state =
    bmi < 18.5
      ? "underweight"
      : bmi >= 18.5 && bmi < 25
      ? "normal"
      : bmi >= 25 && bmi < 30
      ? "overweight"
      : "obese";
  const calHeight =
    heightUnit === "ft" ? Math.floor(exchangeHeightUnit() * 100) : height;
  const calWeight = weightUnit === "lb" ? exchangeWeightValue() : weight;
  let minWeight = ((calHeight % 100) * 8) / 10;
  let maxWeight = calHeight % 100;
// https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cach-do-va-tinh-chi-so-bmi-theo-huong-dan-cua-vien-dinh-duong-quoc-gia/
  function weightText(value) {
    if (weightUnit === "lb") {
      value = value * KG_TO_STONE;
      let stoneValue = value - (value % 1);
      let poundValue = Math.round((value % 1) / STONE_TO_LB);
      return stoneValue + "st " + poundValue + "lb";
    } else {
      return value + "kg";
    }
  }

  return (
    <div className="bmiIndex--result text-center">
      <h3>{bmi}</h3>
      <div>
        <img src={imgSrc} />
      </div>
      <p>
        Your result suggests you are <strong className={state}>{state}</strong>
      </p>
      <p>Healthy weight range for your height: </p>
      <p>
        {weightText(minWeight)} - {weightText(maxWeight)}
      </p>
      {calWeight - maxWeight > 0 && (
        <h4>Aim to lose {weightText(calWeight - maxWeight)}</h4>
      )}
      {calWeight - minWeight < 0 && (
        <h4>Aim to increase {weightText(minWeight - calWeight)}</h4>
      )}
      <div className="bmiIndex--action-calculate">
        <button onClick={resetParams}>Reset</button>
      </div>
    </div>
  );
}

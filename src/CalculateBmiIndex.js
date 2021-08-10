export default function CalculateBmiIndex({
  height,
  weight,
  calculate,
  resetParams
}) {
  return (
    <div className="bmiIndex--action">
      <div className="d-flex justify-content-between">
        <div className="bmiIndex--action-calculate">
          <button
            onClick={height > 0 && weight > 0 ? (e) => calculate() : undefined}
          >
            Calculate
          </button>
        </div>
        <div className="bmiIndex--action-reset">
          <button onClick={resetParams}>Reset</button>
        </div>
      </div>
    </div>
  );
}

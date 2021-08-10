export default function WeightParams({
  weight,
  weightUnit,
  pounds,
  switchWeightUnit,
  setValue
}) {
  return (
    <div className="bmiIndex--param">
      <div className="bmiIndex--param-title">
        <h3>Weight</h3>
      </div>
      <div className="d-flex justify-content-between">
        <div className="bmiIndex--param-input d-flex" style={{ gap: "10px" }}>
          <div>
            <p>{weightUnit === "kg" ? "Kilograms" : "Stone"}</p>
            <input
              type="text"
              className="form-control"
              value={weight}
              onChange={(e) => setValue(e.target.value, "weight")}
            />
          </div>
          {weightUnit === "lb" && (
            <div>
              <p>Pounds</p>
              <input
                type="text"
                className="form-control"
                value={pounds}
                onChange={(e) => setValue(e.target.value, "pounds")}
              />
            </div>
          )}
        </div>
        <div className="bmiIndex--switch-input">
          <button onClick={switchWeightUnit}>
            Switch to {weightUnit === "kg" ? "lb" : "kg"}
          </button>
        </div>
      </div>
    </div>
  );
}

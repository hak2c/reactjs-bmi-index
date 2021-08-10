export default function HeightParams({
  height,
  heightUnit,
  inches,
  switchHeightUnit,
  setValue
}) {
  return (
    <div className="bmiIndex--param">
      <div className="bmiIndex--param-title">
        <h3>Height</h3>
      </div>
      <div className="d-flex justify-content-between">
        <div className="bmiIndex--param-input d-flex" style={{ gap: "10px" }}>
          <div>
            <p>{heightUnit === "cm" ? "Centimetres" : "Feet"}</p>
            <input
              type="text"
              className="form-control"
              value={height}
              onChange={(e) => setValue(e.target.value, "height")}
            />
          </div>
          {heightUnit === "ft" && (
            <div>
              <p>Inches</p>
              <input
                type="text"
                className="form-control"
                value={inches}
                onChange={(e) => setValue(e.target.value, "inches")}
              />
            </div>
          )}
        </div>
        <div className="bmiIndex--switch-input">
          <button onClick={switchHeightUnit}>
            Switch to {heightUnit === "cm" ? "ft" : "cm"}
          </button>
        </div>
      </div>
    </div>
  );
}

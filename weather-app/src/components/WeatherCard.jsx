function WeatherCard({ miasto, temperatura, onClick, isSelected }) {
  return (
    <div
      className={`weather-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick && onClick();
      }}
    >
      <div className="city">{miasto}</div>
      <div className="temp">{temperatura}°C</div>
    </div>
  );
}

export default WeatherCard;

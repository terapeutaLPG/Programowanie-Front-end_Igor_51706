export function convertTemperature(celsius, unit) {
 switch (unit) {
 case 'F':
 // Wzór: °F = °C × 9/5 + 32
 return Math.round((celsius * 9/5) + 32);
 case 'K':
 // Wzór: K = °C + 273.15
 return Math.round(celsius + 273.15);
 case 'C':
 default:
 // Celsjusz - zwracamy bez zmian
 return celsius;
 }
}
export function getUnitSymbol(unit) {
 switch (unit) {
 case 'F': return '°F';
 case 'K': return 'K';
 case 'C':
 default: return '°C';
 }
}
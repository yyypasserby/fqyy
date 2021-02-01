export const Weathers = {
  SUNNY: "SUNNY",
  RAINY: "RAINY",
  WINDY: "WINDY",
  SNOWY: "SNOWY",
} as const;

export type WeatherType = keyof typeof Weathers;

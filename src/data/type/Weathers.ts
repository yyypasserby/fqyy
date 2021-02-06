export const Weathers = {
  RAINY: "RAINY",
  SNOWY: "SNOWY",
  SUNNY: "SUNNY",
  WINDY: "WINDY",
} as const;

export type WeatherType = keyof typeof Weathers;

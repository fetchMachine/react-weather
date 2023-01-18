export interface Weather {
  main: { 
    temp: number; 
    feels_like: number;
    humidity:number;
    sea_level:number;
    pressure: number;
  };
  wind: { speed: number };
  name: string;
  id?: number;
  weather: {icon: string}[];
}

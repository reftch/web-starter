import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { City } from "./model"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function defaultCity(): City | (() => City) {
  return {
    id: 0,
    city: 'Loading...',
    state: '',
    country: '',
    elevation: 0,
    coordinate: {
      latitude: 0,
      longitude: 0,
    },
    current: {
      temperature_2m: 0,
      interval: 0,
      time: '',
    },
  }
}
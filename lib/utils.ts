import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MIN_RADIUS = 7.5;
const MAX_RADIUS = 16;
const DEPTH = 6;
const LEFT_COLOR = "2456ba";
const RIGHT_COLOR = "1f2f50";
const NUM_POINTS = 2500;

interface Point {
  idx: number;
  position: [number, number, number];
  color: string;
}

const getGradientStop = (ratio: number): string => {
  ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

  const c0 = LEFT_COLOR.match(/.{1,2}/g)?.map((oct) => parseInt(oct, 16) * (1 - ratio)) ?? [
    0, 0, 0,
  ];
  const c1 = RIGHT_COLOR.match(/.{1,2}/g)?.map((oct) => parseInt(oct, 16) * ratio) ?? [0, 0, 0];
  const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
  const color = ci
    .reduce((a, v) => (a << 8) + v, 0)
    .toString(16)
    .padStart(6, "0");

  return `#${color}`;
};

const calculateColor = (x: number): string => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = x + MAX_RADIUS;
  const ratio = distance / maxDiff;
  return getGradientStop(ratio);
};

const randomFromInterval = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const pointsInner: Point[] = Array.from({ length: NUM_POINTS }, (_, k): Point => {
  const num = k + 1;
  const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
  const randomAngle = Math.random() * Math.PI * 2;

  const x = Math.cos(randomAngle) * randomRadius;
  const y = Math.sin(randomAngle) * randomRadius;
  const z = randomFromInterval(-DEPTH, DEPTH);

  const color = calculateColor(x);

  return {
    idx: num,
    position: [x, y, z],
    color,
  };
});

export const pointsOuter: Point[] = Array.from({ length: NUM_POINTS / 4 }, (_, k): Point => {
  const num = k + 1;
  const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
  const angle = Math.random() * Math.PI * 2;

  const x = Math.cos(angle) * randomRadius;
  const y = Math.sin(angle) * randomRadius;
  const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

  const color = calculateColor(x);

  return {
    idx: num,
    position: [x, y, z],
    color,
  };
});

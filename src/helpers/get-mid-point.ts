import { pathRegex } from '../constants/path-regex';

// Получаем длину пути и находим его среднюю точку
export const getMidPoint = (path: string) => {
  const match = path.match(pathRegex);
  if (match) {
    const midX = (parseFloat(match[1]) + parseFloat(match[3])) / 2;
    const midY = (parseFloat(match[2]) + parseFloat(match[4])) / 2;
    return { x: midX, y: midY };
  }
  return { x: 0, y: 0 };
};

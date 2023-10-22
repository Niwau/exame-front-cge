import { hexToRGB } from '@/utils/color';

interface ColorProps {
  color: string;
}

export const Color = ({ color }: ColorProps) => {
  return (
    <div style={{ borderColor: color, backgroundColor: hexToRGB(color, 0.8) }} className="w-4 h-4 mx-auto border-2 rounded-full" />
  );
};
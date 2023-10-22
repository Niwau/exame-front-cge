import { hexToRGB } from "@/utils/color"

interface HighlightProps {
  color: string;
  label: string;
}

export const Highlight = ({ color, label }: HighlightProps) => {
  return (
    <div style={{ outlineColor: color, backgroundColor: hexToRGB(color, 0.5) }} className={`py-[2px] px-3 border-solid outline outline-2 rounded-full flex flex-1 items-center justify-center`}>
      <p>{label}</p>
    </div>
  )
}
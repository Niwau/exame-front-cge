import { CaretRight, CaretLeft } from "@phosphor-icons/react";

interface PaginationButtonProps {
  type: 'previous' | 'next';
  onClick: () => void;
  disabled?: boolean;
}

export const PaginationButton = ({ type, onClick, disabled }: PaginationButtonProps) => {

  const props = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: 'white',
    opacity: disabled ? 0.6 : 1,
    size: 20,
    onClick
  }

  if (type == 'previous') {
    return (
      <CaretLeft {...props}/>
    )
  }

  return (
    <CaretRight {...props}/>
  )
}
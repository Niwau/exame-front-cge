import { useEffect } from "react"
import { toast } from 'react-toastify'

export const useErrorChecker = (error: any, message: string) => {
  useEffect(() => {
    if (error) {
      toast.error(message)
    }
  }, [error, message])
}
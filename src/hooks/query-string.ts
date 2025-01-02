import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

const useQueryStringCreator = () => {
  const searchParams=useSearchParams();
  return useCallback(
    (queryKey: string, queryValue: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(queryKey, queryValue)
 
      return params.toString()
    },
    [searchParams]
  )
}

export default useQueryStringCreator
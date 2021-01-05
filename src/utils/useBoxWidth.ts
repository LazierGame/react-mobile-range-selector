import { useEffect, useState } from "react";
import { TimeRange } from "../interfaces";

export function useBoxWidth(value: TimeRange | null): number {
  const [boxWidth, setBoxWidth] = useState(0)

  useEffect(() => {
    if (Array.isArray(value) && value.length === 2) {
      setBoxWidth((value[1] - value[0]) * 100)
    } else {
      setBoxWidth(0)
    }
  }, [value])

  return boxWidth
}

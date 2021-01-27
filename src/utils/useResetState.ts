import { Dispatch, SetStateAction, useCallback, useState } from "react";

export function useResetState<S>(
  initialState: S
): [S, Dispatch<SetStateAction<S>>, () => void] {
  const [state, setState] = useState<S>(initialState);
  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState, resetState];
}

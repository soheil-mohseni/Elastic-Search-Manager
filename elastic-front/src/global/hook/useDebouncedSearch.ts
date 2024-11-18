import { useState, useCallback, startTransition, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import { useSetAtom } from 'jotai';
import { searchAtom } from '../sidebar/atoms'; // Import the search atom

function useDebouncedSearch(initialValue = '', delay = 300) {
  const [search, setSearch] = useState(initialValue);
  const setSearchAtom = useSetAtom(searchAtom);

  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      startTransition(() => {
        console.log(value);
        setSearchAtom(value);
      });
    }, delay),
    [delay, setSearchAtom]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value); // Update local search state
    debouncedChangeHandler(value); // Trigger debounced state update
  };

  return [search, handleChange] as const;
}

export default useDebouncedSearch;

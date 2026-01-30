import { useState } from 'react';

export function useToggle(initialState: boolean = false) {
    const [state, setState] = useState(initialState);

    const toggle = () => {
        setState((prevState) => !prevState);
    };

    return [state, toggle] as const;
}
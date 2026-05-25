export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

// Dark mode removed — keep API stable but always return light
export function initializeTheme(): void {
    // no-op: enforce light UI
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = 'light';
    const resolvedAppearance: ResolvedAppearance = 'light';

    const updateAppearance = (_mode: Appearance): void => {
        // no-op
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}

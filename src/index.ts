import {
    EffectCallback,
    DependencyList,
    useRef,
    useEffect,
    useMemo,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
} from 'react'

import {
    cloneDeep,
    isEqual,
} from 'lodash'

function useDeepCompare(value: DependencyList): DependencyList {
    const prevValue = useRef<DependencyList>(null)
    const signalRef = useRef<boolean>(false)

    if (!isEqual(value, prevValue.current)) {
        prevValue.current = cloneDeep(value)
        signalRef.current = !signalRef.current
    }

    return [signalRef.current]
}

export function useDeepEffect(effect: EffectCallback, deps?: DependencyList): void {
    return useEffect(effect, useDeepCompare(deps))
}

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
    return useMemo<T>(factory, useDeepCompare(deps))
}

export function useDeepCallback(callback: (...args: any[]) => any, deps: DependencyList): (...args: any[]) => any {
    return useCallback(callback, useDeepCompare(deps))
}

export function useDeepImperativeHandle(ref: React.Ref<unknown>, init: () => unknown, deps?: DependencyList): void {
    return useImperativeHandle(ref, init, useDeepCompare(deps))
}

export function useDeepLayoutEffect(effect: EffectCallback, deps?: DependencyList): void {
    return useLayoutEffect(effect, useDeepCompare(deps))
}
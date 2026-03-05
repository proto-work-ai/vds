import { InjectionToken, ValueProvider } from "@angular/core";

export const TABlE_COLUMN_CONTEXT = new InjectionToken<unknown>('TABlE_COLUMN_CONTEXT');
export function tableColumnContextProvider(value: unknown): ValueProvider {
    return {
        provide: TABlE_COLUMN_CONTEXT,
        useValue: value
    };
}

export const TABLE_ROW = new InjectionToken<Record<string, unknown>>('TABLE_ROW');
export function tableRowProvider(value: unknown): ValueProvider {
    return {
        provide: TABLE_ROW,
        useValue: value
    };
}

export const TABLE_ROW_DATA = new InjectionToken<unknown>('TABLE_ROW_DATA');
export function tableRowDataProvider(value: unknown): ValueProvider {
    return {
        provide: TABLE_ROW_DATA,
        useValue: value
    };
}

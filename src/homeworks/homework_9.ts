/*
Потрібно створити тип `DeepReadonly` який буде робити доступними тільки для читання навіть  властивості вкладених обʼєктів.
Потрібно створити тип `DeepRequireReadonly` який буде робити доступними тільки для читання навіть  властивості вкладених
обʼєктів та ще й робити їх обовʼязковими.
Потрібно сворити тип `UpperCaseKeys`, який буде приводити всі ключі до верхнього регістру.
Створіть тип `ObjectToPropertyDescriptor`, який перетворює звичайний обʼєкт на обʼєкт де кожне `value` є дескриптором.
 */

type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type DeepRequireReadonly<T> = {
    readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
};

type UpperCaseKeys<T> = {
    [K in keyof T as Uppercase<string & K>]: T[K];
};

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: PropertyDescriptor;
};

interface Book {
    id: number;
    title: string;
    publisher: string;
    author: {
        name: string;
        country: string;
    };
}

// для перевірки коду використовував TypeScript Playground

type ReadonlyBook = DeepReadonly<Book>;
/*
type ReadonlyBook = {
    readonly id: number;
    readonly title: string;
    readonly publisher: string;
    readonly author: DeepReadonly<{
        name: string;
        country: string;
    }>;
}
 */

type RequiredReadonlyBook = DeepRequireReadonly<Book>;
/*
type RequiredReadonlyBook = {
    readonly id: number;
    readonly title: string;
    readonly publisher: string;
    readonly author: DeepRequireReadonly<{
        name: string;
        country: string;
    }>;
}
 */

type UppercaseBook = UpperCaseKeys<Book>;
/*
type UppercaseBook = {
    ID: number;
    TITLE: string;
    PUBLISHER: string;
    AUTHOR: {
        name: string;
        country: string;
    };
}
 */

type PropertyDescriptorBook = ObjectToPropertyDescriptor<Book>;
/*
type PropertyDescriptorBook = {
    id: PropertyDescriptor;
    title: PropertyDescriptor;
    publisher: PropertyDescriptor;
    author: PropertyDescriptor;
}
 */
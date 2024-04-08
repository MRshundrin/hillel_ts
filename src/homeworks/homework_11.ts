{
    enum Category {
        Software,
    }
    interface Book {
        id: number;
        title: string;
        author: string;
        available: boolean;
        category: Category;
    }

    // 1
    // Об'явіть аліас типу BookRequiredFields, використовуючи інтерфейс Book та утиліту Required.
    type BookRequiredFields = Required<Book>;

    // 2
    // Об'явіть змінну bookRequiredFields типу BookRequiredFields та присвойте їй відповідний об'єкт.
    const bookRequiredFields: BookRequiredFields = {
        id: 10,
        title: "The C Programming Language",
        author: "K & R",
        available: true,
        category: Category.Software,
    };

    // 3
    // Об'явіть аліас типу UpdatedBook, використовуючи інтерфейс Book та утиліту Partial.
    type UpdatedBook = Partial<Book>;

    // 4
    // Об'явіть змінну updatedBook типу UpdatedBook і присвойте їй відповідний об'єкт.
    const updatedBook: UpdatedBook = {
        id: 11,
        title: "Code Complete",
    };
    // 5
    // Об'явіть аліас типу AuthorWoEmail, використовуючи інтерфейс Author та утиліту Omit.
    interface Author {
        name: string;
        email: string;
    }

    type AuthorWoEmail = Omit<Author, 'email'>;

    // 6
    // Об'явіть аліас СreateCustomerFunctionType для функціонального типу функції createCustomer(). Функція приймає рядок і число і повертає їх конкатенацію.
    type CreateCustomerFunctionType = (arg1: string, arg2: number) => string;

    // 7
    // Об'явіть змінну params, використовуючи аліас типу СreateCustomerFunctionType і утиліту Parameters, викличте функцію createCustomer(), передавши змінну params.
    let params: Parameters<CreateCustomerFunctionType> = ['K & R', 10];
    const createCustomer = (name: string, id: number) => {
        return `Name: ${name}, id: ${id}`
    }
    const result = createCustomer(...params);

    console.log(result)

    // 8
    // Об'явіть аліас fn для функціонального типу функції, яка приймає три параметри з типами string, number, boolean і повертає тип symbol.
    type fn = (arg1: string, arg2: number, arg3: boolean) => symbol;

    // 9
    // Об'явіть аліаси типів Param1<T>, Param2<T>, Param3<T>, які повертають тип першого, другого та третього параметрів функції відповідно.
    type Param1<T> = T extends (arg1: infer P1, ...args: any[]) => any ? P1 : never;
    type Param2<T> = T extends (arg1: any, arg2: infer P2, ...args: any[]) => any ? P2 : never;
    type Param3<T> = T extends (arg1: any, arg2: any, arg3: infer P3, ...args: any[]) => any ? P3 : never;

    // 10
    // Об'явіть аліаси P1, P2, P3 та отримайте типи першого, другого та третього параметрів типу fn.
    type P1 = Param1<fn>;
    type P2 = Param2<fn>;
    type P3 = Param3<fn>;

    // 11
    // Створіть утиліти RequiredProps<T> та OptionalProps<T>, які повертають union тип required та optional властивостей об'єкта. Використовуйте mapped type для перебору ключів T та conditional type для трансформації значень ключів типу T. Додайте загальне обмеження для T розширивши його від типу object у RequiredProps та OptionalProps.
    type RequiredProps<T> = {
        [K in keyof T]-?: T extends Record<K, any> ? K : never;
    }[keyof T];

    type OptionalProps<T> = {
        [K in keyof T]-?: T extends Record<K, any> ? never : K;
    }[keyof T];

    // 12
    // Об'явіть аліас типу BookRequiredProps та BookOptionalProps, використовуючи інтерфейс Book та утиліти RequiredProps та OptionalProps. Спробуйте замість Book передати примітивний тип.
    type BookRequiredProps = RequiredProps<Book>;
    type BookOptionalProps = OptionalProps<Book>;
    type StringRequiredProps = RequiredProps<string>;
    type StringOptionalProps = OptionalProps<string>;

    // 13
    // Створіть утиліту RemoveProps <T extends object, TProps extends keyof T>, яка видаляє властивості TProps з переданого типу T.
    type RemoveProps<T extends object, TProps extends keyof T> = Omit<T, TProps>;

    // 14
    // Об'явіть аліас типу BookRequiredPropsType та BookOptionalPropsType, використовуючи інтерфейс Book, аліаси типу BookRequiredProps та BookOptioalProps та утиліту RemoveProps Спробуйте замість Book передати Author.
    type BookRequiredPropsType = RemoveProps<Book, BookOptionalProps>;
    type BookOptionalPropsType = RemoveProps<Book, BookRequiredProps>;
    type StringRequiredPropsType = RemoveProps<Author, BookOptionalProps>;
    // type StringOptionalPropsType = RemoveProps<Author, BookRequiredProps>;

    // 15
    // Створіть функцію update(), яка приймає один параметр типу boolean. Якщо значення аргументу true, функція повинна повертати значення типу string. Якщо значення аргументу false, функція повинна повертати значення типу number.
    const update = (value: boolean): string | number => {
        return value ? "string" : 42;
    }
}

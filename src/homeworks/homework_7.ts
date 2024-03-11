// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання.
// Наприклад, тип значення для кожного ключа може бути число | рядок.
interface IndexSignatureUnion {
    [key: string]: number | string;
}

//Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями.
// Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.
interface IndexSignatureFunction {
    [key: string]: (...args: any[]) => any;
}

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта,
// подібного до масиву. Ключі повинні бути числами, а значення - певного типу.
interface IndexSignatureArrayType {
    [index: number]: string;
}

// Створіть інтерфейс з певними властивостями та індексною сигнатурою.
// Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.
interface WithDynamicProperties {
    name: string;
    [key: string]: any;
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.
interface BaseInterfaceWithIndexSignature {
    [key: string]: number;
}
interface ExtendedInterface extends BaseInterfaceWithIndexSignature {
    specificProperty: number;
}

//Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів
// певним критеріям (наприклад, чи всі значення є числами).

function areAllValuesNumbers(obj: { [key: string]: any }): boolean {
    for (const key in obj) {
        if (typeof obj[key] !== 'number') {
            return false;
        }
    }
    return true;
}

const unionObj: IndexSignatureUnion = {
    key1: 10,
    key2: 'value',
    key3: 20
};

const functionObj: IndexSignatureFunction = {
    func1: (x: number) => x * 2,
    func2: (x: string) => x.toUpperCase()
};

const arrayLikeObj: IndexSignatureArrayType = {
    0: 'zero',
    1: 'one',
    2: 'two'
};

const dynamicPropsObj: WithDynamicProperties = {
    name: 'Shu',
    age: 31,
    gender: 'male'
};

const extendedObj: ExtendedInterface = {
    key1: 10,
    key2: 20,
    specificProperty: 99
};

console.log(areAllValuesNumbers(unionObj)); // false
console.log(areAllValuesNumbers(functionObj)); // false
console.log(areAllValuesNumbers(arrayLikeObj)); // false
console.log(areAllValuesNumbers(dynamicPropsObj)); // false
console.log(areAllValuesNumbers(extendedObj)); // true
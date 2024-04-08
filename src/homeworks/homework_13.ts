{
    // творити декоратор Memoize для методу класу, який буде на основі отриманих аргументів метода повертати закешоване значення
    const Memoize = (target: any, key: string, descriptor: PropertyDescriptor): any => {
        const originalMethod = descriptor.value;
        const cache = new Map();

        descriptor.value = function (...args: any[]) {
            const cacheKey = JSON.stringify(args);
            if (cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }

            const result = originalMethod.apply(this, args);
            cache.set(cacheKey, result);
            return result;
        };

        return descriptor;
    }

    // Cтворити декоратор Debounce для методу класу, який за отриманим значенням буде відтерміновувати запуск методу
    const Debounce = (wait: number): any => {
        return (target: any, key: string, descriptor: PropertyDescriptor): any => {
            let timeout: NodeJS.Timeout;

            const originalMethod = descriptor.value;

            descriptor.value = function (...args: any[]) {
                const later = () => {
                    clearTimeout(timeout);
                    originalMethod.apply(this, args);
                };

                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };

            return descriptor;
        };
    }

    class Example {
        @Memoize
        expensiveOperation(n: number): number {
            console.log('Performing expensive operation...');
            return n * n;
        }

        @Debounce(300)
        handleInput(value: string): void {
            console.log('Handling input:', value);
        }
    }

    const example = new Example();
    console.log(example.expensiveOperation(5)); // Викликає expensiveOperation
    console.log(example.expensiveOperation(5)); // Використовує кеш
    console.log(example.expensiveOperation(10)); // Викликає expensiveOperation
    console.log(example.expensiveOperation(10)); // Використовує кеш
    console.log(example.expensiveOperation(10)); // Використовує кеш
    example.handleInput('First'); // Викликає handleInput через 300мс
    example.handleInput('Second'); // Викликається handleInput через 300мс та перезатирає попередній таймаут
}
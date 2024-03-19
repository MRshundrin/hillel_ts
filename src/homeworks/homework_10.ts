{
    /*
    Створити аналог класу Shelf, який не є класом-узагальненням і працює з двома типами Book та Magazine.
    Модифікувати класс Shelf:
        1. Додати метод printTitles, який виводить у консоль заголовки об’єктів (title)
        2. Додати метод find, який буде перегруженим, прийматиме id чи author і повертатиме об’єкт по id чи author
    */
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

    const inventory: Book[] = [
        {id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software},
        {id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software},
        {id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software},
        {id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software}
    ];

    interface Magazine {
        title: string;
        publisher: string;
    }

    const magazines: Magazine[] = [
        {title: 'Programming Language Monthly', publisher: 'Code Mags'},
        {title: 'Literary Fiction Quarterly', publisher: 'College Press'},
        {title: 'Five Points', publisher: 'GSU'}
    ];

    class Shelf {
        private items: (Book | Magazine)[] = [];

        add(item: Book | Magazine): void {
            this.items.push(item);
        }

        getFirst(): Book | Magazine | undefined {
            return this.items[0];
        }

        printTitles(): void {
            this.items.forEach(item => console.log(item.title));
        }

        find(idOrAuthor: number | string): Book | Magazine | undefined {
            if (typeof idOrAuthor === 'number') {
                return this.items.find(item => 'id' in item && item.id === idOrAuthor);
            } else {
                return this.items.find(item => 'author' in item && item.author === idOrAuthor);
            }
        }
    }

    const mixedShelf = new Shelf();

    inventory.forEach(book => mixedShelf.add(book));

    magazines.forEach(magazine => mixedShelf.add(magazine));
    console.log(mixedShelf.getFirst());

    mixedShelf.printTitles();

    const foundBookById = mixedShelf.find(11);
    console.log(foundBookById);

    const foundBookByAuthor = mixedShelf.find("K & R");
    console.log(foundBookByAuthor);
}
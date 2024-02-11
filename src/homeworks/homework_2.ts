enum Category {
    JavaScript = 'JavaScript',
    CSS = 'CSS',
    HTML = 'HTML',
    TypeScript = 'TypeScript',
    Angular = 'Angular'
}
type Book = {
    id: number,
    title: string,
    author: string,
    available: boolean,
    category: Category
}

/**
 * 1. Реалізуйте функцію getAllBooks(), яка повертає колекцію книжок. Об’явіть цю колекцію всередині функції.
 */
const getAllBooks = (): Book[] => {
    const books: Book[] = [
        {id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
        {id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript},
        {id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
        {id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript}
    ]

    return books;
};

const allBooks: Book[] = getAllBooks();

/**
 * 2. Реалізуйте функцію logFirstAvailable(), яка приймає масив книг як параметр і виводить у консоль:
 * ·кількість книг у масиві
 * ·назву першої доступної книги
 */
const logFirstAvailable = (books: Book[]): void => {
    console.log(books.length);
    console.log(books.filter((book: Book) =>  book.available)[0].title);
};

logFirstAvailable(allBooks);

/**
 * 4. Реалізуйте функцію getBookTitlesByCategory(), яка на вхід повинна отримувати категорію та повертати масив
 * найменувань книг, що належать зазначеній категорії.
 */
const getBookTitlesByCategory = (category: Category): string[] => {
    const filteredBooks: Book[] = allBooks.filter((book: Book) => book.category === category);
    return filteredBooks.map((book: Book) => book.title);
}

const titlesArr: string[] = getBookTitlesByCategory(Category.JavaScript);

/**
 * 5. Реалізуйте функцію logBookTitles(), яка повинна приймати масив рядків та виводити його в консоль.
 * Викличте функції getBookTitlesByCategory() та logBookTitles().
 */
const logBookTitles = (titlesArr: string[]): void => {
    titlesArr.forEach((title:string) => console.log(title));
}

logBookTitles(titlesArr);

/**
 * 6. Реалізуйте функцію getBookAuthorByIndex(), яка повинна приймати index книжки у масиві та повертати пару: назву книжки + автор.
 * Використовуйте tuple для типу, що повертається. Викличте цю функцію.
 *  Внесіть зміни до типу, що повертається функцією getBookAuthorByIndex() – додайте мітки: title, author для типу tuple.
 */

type bookInfo = [string, string]
const getBookAuthorByIndex = (index: number): bookInfo  => {
    const book = allBooks.find((book: Book) => book.id === index);
    return book ? [book.title, book.author] : ['title', 'author'];
}

/**
 * 7. Реалізуйте функцію calcTotalPages(), яка повинна підраховувати кількість сторінок книг у трьох бібліотеках міста
 */
type Library = {lib: string, books: number, avgPagesPerBook: number }
const calcTotalPages = (): bigint => {
    const libraries: Library[] = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },

        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },

        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }

    ];

    let sum: bigint = 0n;

    libraries.forEach((library: Library): void => {
        sum += BigInt(library.books) * BigInt(library.avgPagesPerBook);
    });

    return sum;
}

console.log(calcTotalPages());
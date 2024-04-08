{
    /*
    Завдання 1: Принцип єдиної відповідальності (SRP)
    Створіть невелику програму, яка моделює бібліотечну систему.
    Реалізуйте класи для Книги, Бібліотеки та Користувача.
    Переконайтеся, що кожен клас дотримується принципу єдиної відповідальності.
    Наприклад, клас Книга повинен бути відповідальним за книжкові деталі,
    Бібліотека за бібліотечні операції, а Користувач за користувальницькі дані.
    */
    class Book {
        title: string;
        author: string;

        constructor(title: string, author: string) {
            this.title = title;
            this.author = author;
        }

        getDetails(): string {
            return `${this.title} by ${this.author}`;
        }
    }

    class Library {
        books: Book[];

        constructor() {
            this.books = [];
        }

        addBook(book: Book): void {
            this.books.push(book);
        }

        listBooks(): void {
            this.books.forEach(book => console.log(book.getDetails()));
        }
    }

    class User {
        name: string;
        email: string;

        constructor(name: string, email: string) {
            this.name = name;
            this.email = email;
        }

        getUserInfo(): string {
            return `${this.name} (${this.email})`;
        }
    }

    const book1 = new Book("Book title", "Book author");
    const library = new Library();
    library.addBook(book1);
    library.listBooks();
    const user = new User("John Doe", "john@example.com");
    console.log(user.getUserInfo());
}
{
    /*
    Завдання 2: Принцип відкритості/закритості (OCP)
    Розробіть простий графічний редактор, який дозволяє користувачам малювати різні форми
    (наприклад, кола, прямокутники, трикутники).
    Застосуйте принцип відкритості/закритості для зручного розширення для додавання нових форм
    без змінення існуючого коду.
    Покажіть приклад додавання нової форми (наприклад, еліпса) без модифікації основної
    функціональності малювання.
     */

    interface Shape {
        draw(): void;

        setColor(color: string): void;
    }

    class Circle implements Shape {
        color: string = "black";

        draw() {
            console.log(`Drawing a circle. Color: ${this.color}`);
        }

        setColor(color: string) {
            this.color = color;
        }
    }

    class Rectangle implements Shape {
        color: string = "black";

        draw() {
            console.log(`Drawing a rectangle. Color: ${this.color}`);
        }

        setColor(color: string) {
            this.color = color;
        }
    }

    class Triangle implements Shape {
        color: string = "black";

        draw() {
            console.log(`Drawing a triangle. Color: ${this.color}`);
        }

        setColor(color: string) {
            this.color = color;
        }
    }

    class Ellipse implements Shape {
        color: string = "black";

        draw() {
            console.log(`Drawing an ellipse. Color: ${this.color}`);
        }

        setColor(color: string) {
            this.color = color;
        }
    }

    const circle = new Circle();
    const rectangle = new Rectangle();
    const triangle = new Triangle();
    const ellipse = new Ellipse();

    circle.draw();
    rectangle.draw();
    triangle.draw();
    ellipse.draw();
}
{
    /*
    Завдання 3: Принцип підстановки Лісков (LSP)
    Створіть ієрархію геометричних фігур з класами, такими як Квадрат, Коло та Трикутник.
    Застосуйте принцип підстановки Ліскова, переконавшись, що об'єкти базового класу
    (наприклад, Фігура) можуть бути замінені об'єктами похідних класів без впливу на коректність
    програми. Покажіть приклад, де різні форми можуть використовуватися взаємозамінно.
     */

    abstract class Shape {
        abstract area(): number;
    }

    class Square extends Shape {
        side: number;

        constructor(side: number) {
            super();
            this.side = side;
        }

        area(): number {
            return this.side * this.side;
        }
    }

    class Circle extends Shape {
        radius: number;

        constructor(radius: number) {
            super();
            this.radius = radius;
        }

        area(): number {
            return 3.14 * this.radius * this.radius;
        }
    }

    class Triangle extends Shape {
        base: number;
        height: number;
        constructor(base: number, height: number) {
            super();
            this.base = base;
            this.height = height;
        }

        area(): number {
            return 0.5 * this.base * this.height;
        }
    }

    function calculateArea(shape: Shape): number {
        return shape.area();
    }

    const square = new Square(5);
    const circle = new Circle(3);
    const triangle = new Triangle(5, 8);

    console.log(calculateArea(square));
    console.log(calculateArea(circle));
    console.log(calculateArea(triangle));
}
{
    /*
    Завдання 4: Принцип розділення інтерфейсу (ISP)
    Спроектуйте інтерфейс для Системи Управління Завданнями з методами, такими як createTask(),
    assignTask() та completeTask().
    Реалізуйте класи для різних типів користувачів (наприклад, Розробник, Менеджер).
    Застосуйте принцип розділення інтерфейсу, переконавшись, що кожен клас реалізує лише ті методи,
    які стосуються його ролі.
     */

    interface TaskCreator {
        createTask(): void;
    }

    interface TaskAssigner {
        assignTask(): void;
    }

    interface TaskCompleter {
        completeTask(): void;
    }

    class Developer implements TaskCreator, TaskAssigner {
        createTask(): void {
            console.log("Creating a task");
        }

        assignTask(): void {
            console.log("Assigning a task");
        }
    }

    class Manager implements TaskAssigner, TaskCompleter {
        assignTask(): void {
            console.log("Assigning a task");
        }

        completeTask(): void {
            console.log("Completing a task");
        }
    }

    const developer = new Developer();
    const manager = new Manager();

    developer.createTask();
    developer.assignTask();

    manager.assignTask();
    manager.completeTask();
}
{
    /*
    Завдання 5: Принцип інверсії залежностей (DIP)
    Розробіть систему обміну повідомленнями, де високорівневі модулі відправляють повідомлення
    низькорівневим модулям. Застосуйте принцип інверсії залежностей за допомогою введення залежностей
    або абстракцій, щоб високорівневі модулі залежали від абстракцій, а не від конкретних реалізацій.
    Продемонструйте, що зміна реалізації обміну повідомленнями не впливає на високорівневі модулі.
    */

    interface MessageSender {
        sendMessage(message: string): void;
    }

    interface MessageReceiver {
        receiveMessage(message: string): void;
    }

    class LowLevelModule implements MessageSender, MessageReceiver {
        sendMessage(message: string) {
            console.log("Low-level module: Message sent - ", message);
        }

        receiveMessage(message: string) {
            console.log("Low-level module: Message received - ", message);
        }
    }

    class HighLevelModule {
        messageSender: MessageSender;
        constructor(messageSender: MessageSender) {
            this.messageSender = messageSender;
        }

        sendMessage(message: string) {
            console.log("High-level module: Message sent - ", message);
            this.messageSender.sendMessage(message);
        }
    }

    const lowLevelModule = new LowLevelModule();

    const highLevelModule = new HighLevelModule(lowLevelModule);

    highLevelModule.sendMessage("high-level module");

    class NewLowLevelModule implements MessageSender {
        sendMessage(message: string) {
            console.log("New Low-level module: Message sent - ", message);
        }
    }

    const newLowLevelModule = new NewLowLevelModule();
    const newHighLevelModule = new HighLevelModule(newLowLevelModule);

    newHighLevelModule.sendMessage("new high-level module")
}

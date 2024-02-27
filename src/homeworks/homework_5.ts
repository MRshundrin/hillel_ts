/**
 * Створіть класи Circle, Rectangle, Square і Triangle.
 * У кожного з них є загальнодоступний метод calculateArea.
 * У кожної фігури є загальнодоступні властивості - колір і назва,
 * які не можна змінювати після створення.
 * У Square і Rectangle зі свого боку є ще додатковий метод print,
 * який виводить рядок із формулою розрахунку площі
 */

class Figure {
    readonly name: string;
    readonly color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    calculateArea(): number {
        throw new Error("Method not implemented.");
    }
}

class Circle extends Figure {
    readonly radius: number;

    constructor(radius: number, color: string) {
        super("Circle", color);
        this.radius = radius;
    }

    override calculateArea(): number {
        return 3.14 * this.radius * this.radius;
    }
}

class Rectangle extends Figure {
    readonly width: number;
    readonly height: number;

    constructor(width: number, height: number, color: string) {
        super("Rectangle", color);
        this.width = width;
        this.height = height;
    }

    override calculateArea(): number {
        return this.width * this.height;
    }

    print(): void {
        console.log(`Area of ${this.name} (${this.width} x ${this.height}): ${this.calculateArea()}`);
    }
}

class Square extends Figure {
    readonly side: number;
    constructor(side: number, color: string) {
        super("Square", color);
        this.side = side;
    }

    override calculateArea(): number {
        return this.side * this.side;
    }
    print(): void {
        console.log(`Area of ${this.name} (${this.side} x ${this.side}): ${this.calculateArea()}`);
    }
}

class Triangle extends Figure {
    readonly base: number;
    readonly height: number;

    constructor(base: number, height: number, color: string) {
        super("Triangle", color);
        this.base = base;
        this.height = height;
    }

    override calculateArea(): number {
        return 0.5 * this.base * this.height;
    }
}

const circle = new Circle(5, "red");
console.log(`Area of ${circle.name} with radius ${circle.radius}: ${circle.calculateArea()}`);

const rectangle = new Rectangle(4, 6, "blue");
rectangle.print();

const square = new Square(4, "green");
square.print();

const triangle = new Triangle(3, 5, "yellow");
console.log(`Area of ${triangle.name} with base ${triangle.base} and height ${triangle.height}: ${triangle.calculateArea()}`);
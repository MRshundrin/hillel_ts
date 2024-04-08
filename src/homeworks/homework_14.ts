{
    /* Необхідно написати додаток Todolist. У списку нотаток повинні бути методи
      для додавання нового запису, видалення, редагування та отримання повної інформації
      про нотатку за ідентифікатором, а так само отримання списку всіх нотаток.
      Крім цього, у користувача має бути можливість позначити нотаток, як виконаний,
      і отримання інформації про те, скільки всього нотаток у списку
      і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.
         - Кожний нотаток має назву, зміст, дату створення і редагування та статус.
          Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при редагуванні.
         - Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка
          за ім'ям або змістом.
         - Також окремо необхідно розширити список можливістю сортування нотаток
          за статусом або часом створення.

     */
    class Note {
        id: number;
        title: string;
        content: string;
        createdDate: Date;
        editedDate: Date;
        status: boolean;
        requiresConfirmation: boolean;

        constructor(id: number, title: string, content: string, requiresConfirmation: boolean) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.createdDate = new Date();
            this.editedDate = new Date();
            this.status = false;
            this.requiresConfirmation = requiresConfirmation;
        }

        getId(): number {
            return this.id;
        }

        getTitle(): string {
            return this.title;
        }

        getContent(): string {
            return this.content;
        }

        getCreatedDate(): Date {
            return this.createdDate;
        }

        getEditedDate(): Date {
            return this.editedDate;
        }

        getStatus(): boolean {
            return this.status;
        }

        setStatus(status: boolean): void {
            this.status = status;
        }

        getRequiresConfirmation(): boolean {
            return this.requiresConfirmation;
        }

        update(title: string, content: string): void {
            if (!this.requiresConfirmation || confirm("Are you sure you want to update this note?")) {
                this.title = title;
                this.content = content;
                this.editedDate = new Date();
            }
        }
    }

    class TodoList {
        notes: Note[];

        constructor() {
            this.notes = [];
        }

        addNote(note: Note): void {
            this.notes.push(note);
        }

        deleteNoteById(id: number): void {
            this.notes = this.notes.filter(note => note.getId() !== id);
        }

        getNoteById(id: number): Note | undefined {
            return this.notes.find(note => note.getId() === id);
        }

        getAllNotes(): Note[] {
            return this.notes;
        }

        markNoteAsDone(id: number): void {
            const note = this.getNoteById(id);
            if (note) {
                note.setStatus(true);
            }
        }

        editNoteById(id: number, title: string, content: string): void {
            const note = this.getNoteById(id);
            if (note) {
                note.update(title, content);
            }
        }

        getNumberOfNotes(): number {
            return this.notes.length;
        }

        getNumberOfUndoneNotes(): number {
            return this.notes.filter(note => !note.getStatus()).length;
        }

        searchNotesByTitleOrContent(keyword: string): Note[] {
            return this.notes.filter(note =>
              note.getTitle().includes(keyword) || note.getContent().includes(keyword)
            );
        }

        sortNotesByStatus(): void {
            this.notes.sort((a, b) => (a.getStatus() === b.getStatus() ? 0 : a.getStatus() ? 1 : -1));
        }

        sortNotesByCreatedDate(): void {
            this.notes.sort((a, b) => a.getCreatedDate().getTime() - b.getCreatedDate().getTime());
        }
    }


    const todoList = new TodoList();

    const note1 = new Note(1, "Зробити дз 1", "здати до 01.01.2024", true);
    const note2 = new Note(2, "Зробити дз 2", "здати до 01.01.2025", false);
    const note3 = new Note(3, "Зробити дз 3", "здати до 01.01.2026", false);

    todoList.addNote(note1);
    todoList.addNote(note2);
    todoList.addNote(note3);

    console.log(todoList.getAllNotes());

    todoList.markNoteAsDone(2);

    todoList.editNoteById(3, "Виправити дз 3", "Виправити до 01.01.2026")

    console.log(todoList.getAllNotes());
    console.log(todoList.getNumberOfNotes());
    console.log(todoList.getNumberOfUndoneNotes());

    console.log(todoList.searchNotesByTitleOrContent("Зробити дз 2"));

    todoList.sortNotesByStatus();
    console.log(todoList.getAllNotes());

    todoList.sortNotesByCreatedDate();
    console.log(todoList.getAllNotes());
}
{
    /*
    У вас є дві сутності - список фільмів і список категорій фільмів.
    Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.
    Категорія містить поля: назва і фільми.
    У кожного списку є пошук за ім'ям (це, по суті, фільтрація),
    у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.
    У нас визначено три типи фільтрів:
        - Фільтр відповідності має поле `filter`
        - Фільтр діапазону має поле `filter` і `filterTo`
        - Фільтр пошуку за значеннями має поле `values`
    Кожен список містить стан його фільтрів, який може бути змінений
    тільки методом `applySearchValue` або `applyFiltersValue` (за наявності додаткових фільтрів)
    Вам необхідно подумати про поділ вашого коду на різні сутності,
    інтерфеси і типи, щоб зробити ваше рішення типобезпечним.
    Реалізація всіх методів не є необхідною - це за бажанням.
    */
    interface Movie {
        title: string;
        releaseYear: number;
        rating: number;
        awards: string[];
    }

    interface Category {
        name: string;
        movies: Movie[];
    }

    interface SearchFilter {
        filter: string;
    }

    interface RangeFilter {
        filter: number;
        filterTo: number;
    }

    interface awardsFilter {
        values: string[];
    }

    interface MovieListState {
        searchValue: SearchFilter;
        releaseYearFilter?: RangeFilter;
        ratingFilter?: RangeFilter;
        awardsFilter?: awardsFilter;
    }

    interface CategoryListState {
        searchValue: SearchFilter;
    }
    class MovieList {
        movies: Movie[];
        state: MovieListState;

        constructor(movies: Movie[], initialState: MovieListState) {
            this.movies = movies;
            this.state = initialState;
        }

        applySearchValue(searchValue: SearchFilter): void {
            this.state.searchValue = searchValue;
        }

        applyFiltersValue(filters: Partial<MovieListState>): void {
            this.state = { ...this.state, ...filters };
        }

        applyReleaseYearFilter(filter: RangeFilter): void {
            this.state.releaseYearFilter = filter;
        }

        filterMovies(): Movie[] {
            let filteredMovies = this.movies.filter(movie =>
              movie.title.toLowerCase().includes(this.state.searchValue.filter.toLowerCase())
            );

            if (this.state.releaseYearFilter) {
                filteredMovies = filteredMovies.filter(movie =>
                  !this.state.releaseYearFilter?.filter ||
                  (movie.releaseYear >= this.state.releaseYearFilter.filter &&
                    movie.releaseYear <= (this.state.releaseYearFilter.filterTo || Infinity))
                );
            }

            if (this.state.ratingFilter) {
                filteredMovies = filteredMovies.filter(movie =>
                  !this.state.ratingFilter?.filter ||
                  movie.rating >= this.state.ratingFilter.filter
                );
            }

            if (this.state.awardsFilter) {
                filteredMovies = filteredMovies.filter(movie =>
                  !this.state.awardsFilter?.values ||
                  movie.awards.some(award => this.state.awardsFilter?.values!.includes(award))
                );
            }

            return filteredMovies;
        }
    }

    class CategoryList {
        categories: Category[];
        state: CategoryListState;

        constructor(categories: Category[], initialState: CategoryListState) {
            this.categories = categories;
            this.state = initialState;
        }

        applySearchValue(searchValue: SearchFilter): void {
            this.state.searchValue = searchValue;
        }

        filterCategories(): Category[] {
            return this.categories.filter(category =>
              category.name.toLowerCase().includes(this.state.searchValue.filter.toLowerCase())
            );
        }
    }


    // Example usage
    const movies: Movie[] = [
        { title: "Movie 1", releaseYear: 2020, rating: 8, awards: ["best film"] },
        { title: "Movie 2", releaseYear: 2018, rating: 7, awards: ["best actor", "best director"] },
        { title: "Movie 3", releaseYear: 2010, rating: 5, awards: ["best music", "best film"] },
        // Add more movies
    ];

    const categories: Category[] = [
        { name: "action", movies: [movies[0], movies[1]] },
        { name: "history", movies: [movies[1], movies[2]] }
    ];

    const movieList = new MovieList(movies, { searchValue: {filter: ''} });
    movieList.applyFiltersValue({ releaseYearFilter: { filter: 2010, filterTo: 2018 } });
    movieList.applyFiltersValue({ awardsFilter: { values: ["best director"] } });
    const filteredMovies = movieList.filterMovies();
    console.log(movieList)
    console.log(filteredMovies);

    const categoryList = new CategoryList(categories, { searchValue: {filter: ''}});
    categoryList.applySearchValue({filter: "action"});
    const filteredCategories = categoryList.filterCategories();
    console.log(categoryList);
    console.log(filteredCategories);
}

/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/


'use strict';

// Код возьмите из предыдущего домашнего задания

let numberOfFilms;

function start() {

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '0');
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};
/*

const a = prompt('Один из последних просмотренных фильмов?', 'red line'),
    b = prompt('На сколько оцените его?', '5.1'),
    c = prompt('Один из последних просмотренных фильмов?', 'red line'),
    d = prompt('На сколько оцените его?', '5.1');
personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;
*/


function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        const a = prompt('Один из последних просмотренных фильмов?', 'red line'),
            b = prompt('На сколько оцените его?', '5.1');

        if (a != null && b != null && a != '' && b != '' && a.length < 50) {
            personalMovieDB.movies[a] = b;
            console.log("DONE");
        } else {
            console.log('Error!');
            i--;
        }
    }
}

//rememberMyFilms();

/*
let i=0;
do {
    
    const a = prompt('Один из последних просмотренных фильмов?', 'red line'),
        b = prompt('На сколько оцените его?', '5.1');

    if (a != null && b != null && a != '' && b != '' && a.length < 50) {
        personalMovieDB.movies[a] = b;
        console.log("DONE");
    } else {
        console.log('Error!');
        i--;
    }
    i++;
}
while (i<2);
*/
/*
let i=0;
while (i<2){
    const a = prompt('Один из последних просмотренных фильмов?', 'red line'),
        b = prompt('На сколько оцените его?', '5.1');

    if (a != null && b != null && a != '' && b != '' && a.length < 50) {
        personalMovieDB.movies[a] = b;
        console.log("DONE");
    } else {
        console.log('Error!');
        i--;
    }
    i++;
}
*/

function detectPersonalLevel() {

    if (personalMovieDB.count < 10) {
        console.log('Просмотрено довольно мало фильмов');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log('Вы классический зритель');
    } else if (personalMovieDB.count >= 30) {
        console.log('Вы киноман');
    } else {
        console.log('Произошла ошибка');
    }
}
//detectPersonalLevel();

function showMyDB(hidden) {
    if (!hidden) {
        console.log(personalMovieDB);
    }
}
showMyDB(personalMovieDB.privat);

function writeYourGenres() {
    for (let i = 1; i <= 3; i++) {
        const genre = prompt(`Ваш любимый жанр под номером ${i}`, 'триллер');
        if (genre != null && genre != '' && genre.length < 50) {
            personalMovieDB.genres[i-1] = genre;
            console.log("DONE");
        } else {
            console.log('Error!');
            i--;
        }
    }
}
 writeYourGenres();
# Aviasales

Тестовое [задание](https://github.com/KosyanMedia/test-tasks/tree/master/aviasales) Aviasales

## Описание
Реализован фронтенд проект - страница выдачи билетов с фильтрами и переключением валют. Проект написан на 
[Angular CLI](https://github.com/angular/angular-cli), хотя в задании просят React :).
Реализован рендер билетов с данными сортированные по цене из json файла, фильтрация билетов в выдаче по количеству пересадок,
логика переключения валют. Кстати курсы валют беруться с [api центробанка](https://www.cbr-xml-daily.ru/).

## Run
```bash
git clone https://github.com/le2xx/Aviasales.git
cd Aviasales
npm install -g @angular/cli
npm i
ng serve
http://localhost:4200/
```

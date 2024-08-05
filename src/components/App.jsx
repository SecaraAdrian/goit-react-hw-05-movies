import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './Header';
import { lazy, Suspense } from 'react';
// lazy, Suspense використовуємо для розділення коду на частини аби не потрібні поки
// не вантажились до вимоги

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

// виконуємо динамічний імпорт за допомогою функції lazy аби реалізувати відкладене завантаження
//  ***.chunk.js (чанк - файл динамічного імпорту). Першопочатковий файл завантаження bundle.js.
// Прописуємо колбек функцію, в якій використовуємо імпорт зі шляхом.
// У кожній константі динамічного імпорту лежить щось схоже на проміс.
// Для того аби витягнути інформацію з цих імпортів, існує компонент Suspense (працює наче await
// в промісах - дочикується доки заберуться дані з промісу, тоді їх використає).
// Динамічно імпортовані компоненти потрібно огорнути в Suspense. Він може приймати
// fallback={<p>Loading...</p>}, де вказується відображуване підчас підвантажування сторінки,
// якщо ми не ставимо додатково лоадер. fallback перекриває ту частину, яку огортає, тут уважно користуємось.
// В кожному компоненті ми створюємо додатково файл index.js для дефолтного реекспорту аби уникнути додаткової
// мороки з перетворенням даних із динамічних імпортів. Не динамічні компоненти можуть бути огорнуті в Suspense.
// Suspense можна прописувати кожному Route окремо <Route path="/" element={<Suspense><Home /></Suspense>} />,
// але не можна в Routes, бо він приймає лише Route.
export const App = () => {
  return (
    <main>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </main>
  );
};

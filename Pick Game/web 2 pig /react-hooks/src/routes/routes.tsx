import Games, { PigGame, Sudoku } from 'pages';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

const Routes = () => (
  <div className=" bg-white dark:bg-black h-screen">
    <Switch>
      <Route path="games">
        <Route index element={<Games />} />

        <Route path="pig">
          <Route index element={<PigGame.List />} />
          <Route path="new" element={<PigGame.New />} />
          <Route path=":gameId" element={<PigGame.Single />} />
        </Route>

        <Route path="sudoku">
          <Route index element={<Sudoku.List />} />
          <Route path="new" element={<Sudoku.New />} />
          <Route path=":gameId" element={<Sudoku.Single />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/games" />} />
    </Switch>
  </div>
);

export default Routes;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HabitProvider } from './context/HabitContext';
import { ThemeProvider } from './theme/ThemeProvider';
import MainRouter from './screens/MainRouter';

export default function App() {
  return (
    <ThemeProvider>
      <HabitProvider>
        <MainRouter />
      </HabitProvider>
    </ThemeProvider>
  );
}


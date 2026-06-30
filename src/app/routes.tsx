import { createHashRouter } from 'react-router-dom'
import { App } from './App'
import { AtlasPage } from '../pages/AtlasPage'
import { CalculatorPage } from '../pages/CalculatorPage'
import { DesignLabPage } from '../pages/DesignLabPage'
import { HomePage } from '../pages/HomePage'
import { SpecificationPage } from '../pages/SpecificationPage'
import { SplitPage } from '../pages/SplitPage'

export const AppRouter = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'atlas', element: <AtlasPage /> },
      { path: 'calculator', element: <CalculatorPage /> },
      { path: 'design-lab', element: <DesignLabPage /> },
      { path: 'split', element: <SplitPage /> },
      { path: 'specification', element: <SpecificationPage /> },
    ],
  },
])

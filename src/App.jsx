import React from 'react'
import MemoizedList from './MemoizedList/MemoizedList'
import ExpensiveHandlerExample from './calculateComplexScore/calculateComplexScore'
import ParentComponent from './Parent-Child Component/ParentComponent'

const App = () => {
  return (
    <div>
      <MemoizedList/>
      <ExpensiveHandlerExample/>
      <ParentComponent/>
    </div>
  )
}

export default App
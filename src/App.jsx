import React from 'react'
import MemoizedList from './MemoizedList/MemoizedList'
import ExpensiveHandlerExample from './calculateComplexScore/calculateComplexScore'

const App = () => {
  return (
    <div>
      <MemoizedList/>
      <ExpensiveHandlerExample/>
    </div>
  )
}

export default App
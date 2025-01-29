import React from 'react'
import MemoizedList from './MemoizedList/MemoizedList'
import ExpensiveHandlerExample from './calculateComplexScore/calculateComplexScore'
import ParentComponent from './Parent-Child Component/ParentComponent'
import SearchBox from './SearchBox/SearchBox'

const App = () => {
  return (
    <div>
      <MemoizedList/>
      <ExpensiveHandlerExample/>
      <ParentComponent/>
      <SearchBox/>
    </div>
  )
}

export default App
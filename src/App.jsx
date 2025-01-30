import React from 'react'
import MemoizedList from './useCallback/MemoizedList/MemoizedList'
import ExpensiveHandlerExample from './useCallback/calculateComplexScore/calculateComplexScore'
import ParentComponent from './useCallback/Parent-Child Component/ParentComponent'
import SearchBox from './useCallback/SearchBox/SearchBox'
import CanvasDrawingApp from './useCallback/CanvasDrawingApp/CanvasDrawingApp'
import DragAndDropUploader from './useCallback/DragAndDropUploader/DragAndDropUploader'
import MapWithDraggableMarkers from './useCallback/MapWithDraggableMarkers/MapWithDraggableMarkers'
import SortableTable from './useCallback/SortableTable/SortableTable'

const data = [
  { name: "Eva", age: 45, city: "Houston" },
  { name: "Alice", age: 75, city: "New York" },
  { name: "Bob", age: 30, city: "Los Angeles" },
  { name: "Charlie", age: 35, city: "Chicago" },
  { name: "David", age: 40, city: "Miami" },
  
];

const App = () => {
  return (
    <div>
      <MemoizedList/>
      <ExpensiveHandlerExample/>
      <ParentComponent/>
      <SearchBox/>
      <CanvasDrawingApp/>
      <DragAndDropUploader/>
      <MapWithDraggableMarkers/>
      <h1>Sortable Table</h1>
      <SortableTable data={data} />
    </div>
  )
}

export default App
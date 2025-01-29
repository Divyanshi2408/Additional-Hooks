import React from 'react'
import MemoizedList from './MemoizedList/MemoizedList'
import ExpensiveHandlerExample from './calculateComplexScore/calculateComplexScore'
import ParentComponent from './Parent-Child Component/ParentComponent'
import SearchBox from './SearchBox/SearchBox'
import CanvasDrawingApp from './CanvasDrawingApp/CanvasDrawingApp'
import DragAndDropUploader from './DragAndDropUploader/DragAndDropUploader'
import MapWithDraggableMarkers from './MapWithDraggableMarkers/MapWithDraggableMarkers'
import SortableTable from './SortableTable/SortableTable'

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
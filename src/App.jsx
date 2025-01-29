import React from 'react'
import MemoizedList from './MemoizedList/MemoizedList'
import ExpensiveHandlerExample from './calculateComplexScore/calculateComplexScore'
import ParentComponent from './Parent-Child Component/ParentComponent'
import SearchBox from './SearchBox/SearchBox'
import CanvasDrawingApp from './CanvasDrawingApp/CanvasDrawingApp'
import DragAndDropUploader from './DragAndDropUploader/DragAndDropUploader'
import MapWithDraggableMarkers from './MapWithDraggableMarkers/MapWithDraggableMarkers'

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
    </div>
  )
}

export default App
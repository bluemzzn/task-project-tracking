function App(){
  return(
    <div className="flex h-screen w-full bg-gray-50">
      //left
      <div className="w-64 bg-white border-gray-200">
        SlideBar Here
      </div>
      
      //Right 
      <div className="flex-1 flex flex-col">
        Main content Here 
      </div>
    </div>
  )
}

export default App
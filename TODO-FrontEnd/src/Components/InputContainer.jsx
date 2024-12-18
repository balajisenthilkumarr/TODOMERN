function InputContainer({ title, writesettitle, description, writeDescription, addTask }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a Task</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter a Title"
          value={title}
          onChange={writesettitle}
          className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter a Description"
          value={description}
          onChange={writeDescription}
          className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default InputContainer;

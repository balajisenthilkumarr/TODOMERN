import React from "react";

function Container({
  task,
  deleteTask,
  handlingEdit,
  isEditing,
  editingTaskId,
  editingTitle,
  editingDescription,
  handlecancel,
  setEditingTitle,
  setEditingDescription,
  handleUpdate,
}) {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-300 p-6 rounded-md shadow-md my-10">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        All Tasks
      </h2>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {task.map((task) => (
          <div
            key={task._id}
            className="bg-blue-300 shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 border border-gray-200"
          >
            {/* Task Title */}
            {isEditing &&editingTaskId=== task._id ? (
              <div>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="mb-4 p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  className="mb-4 p-2 w-full border border-gray-300 rounded"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={handlecancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-950 pb-2">
                  {task.title}
                </h3>

                {/* Task Description */}
                <p className="text-gray-600 mb-4 border-b border-gray-800 pb-2">
                  {task.description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end mt-4 space-x-3">
                  <button
                    onClick={() => handlingEdit(task._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                  Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Container;

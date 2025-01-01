import { Todo } from "../model/todoModel.js";
export const addTodo = async (req, res) => {
  const name = req.body.name;
  try {
    if (!name) {
      return req.status(401).json({
        success: false,
        message: "plz fill all the entry",
      });
    }
    const newTodo = new Todo({ name });
    await newTodo.save();
    return res
      .status(201)
      .json({ succes: true, message: "todo created succesfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(201).json({ todos });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const putTodo = async (req, res) => {
  const Id = req.params.id;
  const name = req.body.name;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      Id,
      { name },
      { new: true }
    );
    if (!updatedTodo) {
      return res
        .status(401)
        .json({ succes: false, message: "Todo not updated" });
    }
    return res
      .status(501)
      .json({ succes: true, updatedTodo, message: "Todo updated sucesfully" });
  } catch (error) {
    req.status(501).json({ message: error.message });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(401).json({ message: "Todo not deleted" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Todo deleted succesfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

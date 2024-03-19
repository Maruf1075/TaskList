import React, { useState } from 'react';

interface TodoItem {
  text: string;
  id: number;
}

const TaskList: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [text, setText] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setText(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (editId !== null) {
      
      const updatedItems = items.map(item => (item.id === editId ? { ...item, text } : item));
      setItems(updatedItems);
      setEditId(null);

    } else {
      
        if(text !== ''){
          const newItem: TodoItem = { text, id: Date.now() };
          setItems([...items, newItem]);
        }
        
    }
    setText('');
  };

  const handleEdit = (id: number): void => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setText(itemToEdit.text);
      setEditId(id);
    }
  };

  const handleDelete = (id: number): void => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className='container'>
      <h1>Simple TaskList</h1>
      <TodoList items={items} onEdit={handleEdit} onDelete={handleDelete} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">What needs to be done?</label>
        <input id="new-todo" onChange={handleChange} value={text} />
        <button type="submit">{editId !== null ? 'Update' : 'Add'} #{items.length + 1}</button>
      </form>
    </div>
  );
};

interface TodoListProps {
  items: TodoItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onEdit, onDelete }) => (
  <ul>
    {items.map(({ id, text }) => (
      <li key={id}>
        {text}
        <button onClick={() => onEdit(id)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default TaskList;

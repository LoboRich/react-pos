import { useEffect, useState } from 'react';
import { addDoc } from "firebase/firestore";

export default function New({categoriesCollectionRef}) {
  const [newCategory, setnewCategory] = useState({});

  const create = async () => {
    await addDoc(categoriesCollectionRef, {name: newCategory});
  }
  return (
    <div>
      <input type="text" onChange={(event) => {setnewCategory(event.target.value)}} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      <button onClick={create}>Create Category</button>
    </div>
  )
}

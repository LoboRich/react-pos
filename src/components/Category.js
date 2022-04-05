import { useEffect, useState } from 'react';
// import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

const Category = ({db}) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setnewCategory] = useState({});
  const categoriesCollectionRef = collection(db, "categories");
  
  const create = async () => {
    await addDoc(categoriesCollectionRef, {name: newCategory});
  }

  const update = async (e) => {
    const categoryDoc = doc(db, "categories", e.target.id)
    const newFields = {name: e.target.value}
    await updateDoc(categoryDoc, newFields)
  }

  const remove = async (id) => {
    const categoryDoc = doc(db, "categories", id)
    await deleteDoc(categoryDoc)
  }

  useEffect(() => {
    const getCategories = async () =>{
      const data = await getDocs(categoriesCollectionRef)
      setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getCategories();
  }, [])

  return (
    <div>
      <div>
        <input type="text" onChange={(event) => {setnewCategory(event.target.value)}} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        <button onClick={create}>Create Category</button>
      </div>
      {categories.map((category) => {
        return (
          <div key={category.id}>
             <input id={category.id} type="text" name="name" onChange={update} value={category.name}/>
             <button onClick={() => {remove(category.id)}}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Category

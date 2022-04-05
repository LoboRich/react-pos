import { useEffect, useState } from 'react';
// import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

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
        <input type="text" onChange={(event) => {setnewCategory(event.target.value)}}/>
        <button onClick={create}>Create Category</button>
      </div>
      {categories.map((category) => {
        return (
          <div key={category.id}>
             <input id={category.id} type="text" name="name" onChange={update} value={category.name}/>
          </div>
        )
      })}
    </div>
  )
}

export default Category

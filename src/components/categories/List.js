import { useEffect, useState } from 'react';
import { collection, updateDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import Form from './Form';

const Category = ({db}) => {
  const [categories, setCategories] = useState([]);
  const categoriesCollectionRef = collection(db, "categories");

  const update = async (e) => {
    const categoryDoc = doc(db, "categories", e.target.id)
    const newFields = {name: e.target.value}
    await updateDoc(categoryDoc, newFields)
  }

  const remove = async (id) => {
    const categoryDoc = doc(db, "categories", id)
    await deleteDoc(categoryDoc)
  }

  // List of Catefories
  // useEffect(() => {
  //   const getCategories = async () =>{
  //     const data = await getDocs(categoriesCollectionRef)
  //     setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  //   };
  //   getCategories();
  // }, [])

  // List of Catefories Realtime
  useEffect(() => {
    const category_lists = onSnapshot(categoriesCollectionRef, snapshot => {
      setCategories(snapshot.docs.map(doc =>  ({data: doc.data(), id: doc.id})));
    })
    return () => {
      category_lists()
    }
  }, []);

  return (
    <div>
      <Form categoriesCollectionRef={categoriesCollectionRef}/>
      {categories.map((category) => {
        return (
          <div key={category.id}>
             <input id={category.id} type="text" name="name" onChange={update} value={category.data.name}/>
             <button onClick={() => {remove(category.id)}}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Category

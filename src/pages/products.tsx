import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Product,Cart,User} from '../types';
import {MultiSelectTextBox,MultiSelectTextBoxProps}from './category';
import ImageUpload from './image'; 


interface Option {
  id: number;
  name: string;
}
const options: Option[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
];

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://48daf846-aa68-4aa7-b792-897eac545218-00-3q9ho9zg5d3a9.sisko.repl.co/products/api/GetProducts');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageChange = (imageUrl: string) => {
    setProducts(products.filter(product => product.image == imageUrl));
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`https://48daf846-aa68-4aa7-b792-897eac545218-00-3q9ho9zg5d3a9.sisko.repl.co/products/api/DeleteProduct/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('https://48daf846-aa68-4aa7-b792-897eac545218-00-3q9ho9zg5d3a9.sisko.repl.co/products/api/SaveProduct', { name, price: parseFloat(price), description });
      setProducts([...products, response.data]);
      setName('');
      setPrice('');
      setDescription('');
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const handleUpdateProduct = async (productId: string, updatedProduct: Partial<Product>) => {
    try {
      const response = await axios.put(`https://48daf846-aa68-4aa7-b792-897eac545218-00-3q9ho9zg5d3a9.sisko.repl.co/products/api/UpdateProduct/${productId}`, updatedProduct);
      const updatedProducts = products.map(product =>
        product.id === productId ? response.data : product
      );
      setProducts(updatedProducts);
      console.log(updatedProduct);
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const handleSelectedOptionsChange = (newSelectedOptions: Option[]) => {
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div>
      <h1>Product Management</h1>
      <h2>Add Product</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddProduct();
      }}>
        <div className='row'>
        
        <div className='col-12 col-md-6'>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
         
        </div>
        <div className='col-xs-3'>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
         
        </div>
        <div className='col-xs-3'>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
         
        </div>
        </div>
        <div className='row'>
        <div className='col-xs-3'>  
          <label>Categories:</label>
          <MultiSelectTextBox    options={options}/>
        </div>
        <div>
         
        </div>
        <div className='col-xs-3'>
          <label>Image:   </label>
          <ImageUpload onImageChange={handleImageChange} />
        </div>
        </div> 


        
        <button type="submit">Add Product</button>
      </form>
      <hr />
      <h2>Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: ${product.category}</p>
              <p>Image: ${product.image}</p>
              <div>              <img src={product.image} alt="Product" style={{ maxWidth: '100%', maxHeight: '300px' }} />
</div>
              
              <div>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                <button onClick={() => handleUpdateProduct(product.id, { title: 'Updated Name', price: 100 })}>Update</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductManagement;

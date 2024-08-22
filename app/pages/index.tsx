import { useEffect, useState } from 'react';

interface Product {
  id: number;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ productName: '', price: 0, image: '', quantity: 0 });

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddProduct = () => {
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => setProducts([...products, data]));
  };

  const handleDeleteProduct = (id: number) => {
    fetch(`/api/products/${id}`, {
      method: 'DELETE',
    }).then(() => setProducts(products.filter(product => product.id !== id)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.productName}
          onChange={e => setNewProduct({ ...newProduct, productName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="URL Hình ảnh"
          value={newProduct.image}
          onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Số lượng"
          value={newProduct.quantity}
          onChange={e => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
        />
        <button onClick={handleAddProduct}>Thêm sản phẩm</button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">STT</th>
            <th className="py-2">Tên sản phẩm</th>
            <th className="py-2">Hình ảnh</th>
            <th className="py-2">Giá</th>
            <th className="py-2">Số lượng</th>
            <th className="py-2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{product.productName}</td>
              <td className="py-2"><img src={product.image} alt={product.productName} width="50" /></td>
              <td className="py-2">{product.price} VND</td>
              <td className="py-2">{product.quantity}</td>
              <td className="py-2">
                <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

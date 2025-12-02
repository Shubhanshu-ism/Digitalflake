import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Category from './pages/Category';
import Subcategory from './pages/Subcategory';
import Products from './pages/Products';
import AddCategory from './pages/AddCategory';
import AddSubcategory from './pages/AddSubcategory';
import AddProduct from './pages/AddProduct';
import EditCategory from './pages/EditCategory';
import EditSubcategory from './pages/EditSubcategory';
import EditProduct from './pages/EditProduct';
import Designs from './pages/Designs';
import AddDesign from './pages/AddDesign';
import EditDesign from './pages/EditDesign';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/category/add" element={<AddCategory />} />
                            <Route path="/category/edit/:id" element={<EditCategory />} />
                            <Route path="/subcategory" element={<Subcategory />} />
                            <Route path="/subcategory/add" element={<AddSubcategory />} />
                            <Route path="/subcategory/edit/:id" element={<EditSubcategory />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/add" element={<AddProduct />} />
                            <Route path="/products/edit/:id" element={<EditProduct />} />
                            <Route path="/designs" element={<Designs />} />
                            <Route path="/designs/add" element={<AddDesign />} />
                            <Route path="/designs/edit/:id" element={<EditDesign />} />
                            <Route path="/settings" element={<Settings />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthChecker from './services/AuthChecker';
import {
    LoginPage,
    RegisterPage,
    DashboardPage,
    BorrowedGoodsPage,
    LentGoodsPage,
    ContactsPage,
    ItemsPage,
    CurrenciesPage,
    AddContactPage,
    EditContactPage,
    AddItemPage,
    EditItemPage,
    AddCurrencyPage,
    EditCurrencyPage,
    AddBorrowedGoodPage,
    EditBorrowedGoodPage,
    AddLentGoodPage,
    EditLentGoodPage
} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Auth-protected routes */}
                <Route element={<AuthChecker />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />

                    <Route path="/borrowed-goods" element={<BorrowedGoodsPage />} />
                    <Route path="/borrowed-goods/add" element={<AddBorrowedGoodPage />} />
                    <Route path="/borrowed-goods/edit/:id" element={<EditBorrowedGoodPage />} />

                    <Route path="/lent-goods" element={<LentGoodsPage />} />
                    <Route path="/lent-goods/add" element={<AddLentGoodPage />} />
                    <Route path="/lent-goods/edit/:id" element={<EditLentGoodPage />} />

                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/contacts/add" element={<AddContactPage />} />
                    <Route path="/contacts/edit/:id" element={<EditContactPage />} />

                    <Route path="/items" element={<ItemsPage />} />
                    <Route path="/items/add" element={<AddItemPage />} />
                    <Route path="/items/edit/:id" element={<EditItemPage />} />

                    <Route path="/currencies" element={<CurrenciesPage />} />
                    <Route path="/currencies/add" element={<AddCurrencyPage />} />
                    <Route path="/currencies/edit/:id" element={<EditCurrencyPage />} />

                </Route>

                {/* Fallback — if no route matches */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

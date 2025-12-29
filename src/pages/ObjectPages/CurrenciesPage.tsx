import React from "react";
import { CurrencyResponse } from "../../types/currency";
import { BaseObjectPage } from "./BaseObjectPage";

const columns = [
    { header: "Name", field: "name" },
    { header: "Description", field: "description" }
];

const CurrenciesPage: React.FC = () => (
    <BaseObjectPage<CurrencyResponse>
        title="Currencies"
        fetchUrl="/api/currencies"
        deleteUrl={id => `/api/currencies/delete/${id}`}
        routeBase="/currencies"
        columns={columns}
    />
);

export default CurrenciesPage;


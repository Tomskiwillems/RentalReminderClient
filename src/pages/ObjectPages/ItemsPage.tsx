import React from "react";
import { ItemResponse } from "../../types/item";
import { BaseObjectPage } from "./BaseObjectPage";

const columns = [
    { header: "Name", field: "name" },
    { header: "Description", field: "description" }
];

const ItemsPage: React.FC = () => (
    <BaseObjectPage<ItemResponse>
        title="Items"
        fetchUrl="/api/items"
        deleteUrl={id => `/api/items/delete/${id}`}
        routeBase="/items"
        columns={columns}
    />
);

export default ItemsPage;

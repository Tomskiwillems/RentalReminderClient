import React from "react";
import { LentGoodResponse } from "../../types/lentgood";
import { BaseObjectPage } from "./BaseObjectPage";

const columns = [
    { header: "Contact", field: "contactName" },
    { header: "Item / Currency", field: "itemOrCurrency" },
    { header: "Amount", field: "amount" },
    { header: "Start Date", field: "startDateFormatted" },
    { header: "End Date", field: "endDateFormatted" }
];

const LentGoodsPage: React.FC = () => (
    <BaseObjectPage<LentGoodResponse>
        title="Lent Goods"
        fetchUrl="/api/lent-goods"
        deleteUrl={id => `/api/lent-goods/delete/${id}`}
        routeBase="/lent-goods"
        columns={columns}
        transformData={g => ({
            ...g,
            contactName: g.contact?.name ?? "",
            itemOrCurrency: g.item?.name ?? g.currency?.name ?? "",
            startDateFormatted: g.startDate ? new Date(g.startDate).toLocaleDateString() : "",
            endDateFormatted: g.endDate ? new Date(g.endDate).toLocaleDateString() : ""
        })}
    />
);

export default LentGoodsPage;

import React from "react";
import { BorrowedGoodResponse } from "../../types/borrowedgood";
import { BaseObjectPage } from "./BaseObjectPage";

const columns = [
    { header: "Contact", field: "contactName" },
    { header: "Item / Currency", field: "itemOrCurrency" },
    { header: "Amount", field: "amount" },
    { header: "Start Date", field: "startDateFormatted" },
    { header: "End Date", field: "endDateFormatted" }
];

const BorrowedGoodsPage: React.FC = () => (
    <BaseObjectPage<BorrowedGoodResponse>
        title="Borrowed Goods"
        fetchUrl="/api/borrowed-goods"
        deleteUrl={id => `/api/borrowed-goods/delete/${id}`}
        routeBase="/borrowed-goods"
        columns={columns}
        transformData={bg => ({
            ...bg,
            contactName: bg.contact?.name ?? "",
            itemOrCurrency: bg.item?.name ?? bg.currency?.name ?? "",
            startDateFormatted: bg.startDate ? new Date(bg.startDate).toLocaleDateString() : "",
            endDateFormatted: bg.endDate ? new Date(bg.endDate).toLocaleDateString() : ""
        })}
    />
);

export default BorrowedGoodsPage;

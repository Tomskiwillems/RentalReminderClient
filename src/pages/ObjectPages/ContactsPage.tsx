import React from "react";
import { ContactResponse } from "../../types/contact";
import { BaseObjectPage } from "./BaseObjectPage";

const columns = [
    { header: "Name", field: "name" },
    { header: "Description", field: "description" }
];

const ContactsPage: React.FC = () => (
    <BaseObjectPage<ContactResponse>
        title="Contacts"
        fetchUrl="/api/contacts"
        deleteUrl={id => `/api/contacts/delete/${id}`}
        routeBase="/contacts"      // ✅ frontend route base
        columns={columns}
    />
);

export default ContactsPage;

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInvoices, saveInvoices, getCustomerById } from '../utils/localStorage';

const useInvoice = (invoiceId, customerId) => {
  const [invoice, setInvoice] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const allInvoices = getInvoices();
    let currentInvoice;

    if (invoiceId === 'new') {
      const nextId = new Date().getTime().toString(); // Use timestamp for unique ID
      currentInvoice = {
        id: nextId,
        customerId: parseInt(customerId, 10),
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        poNumber: '',
        status: 'Draft',
        notes: '',
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        amountPaid: 0,
        balanceDue: 0,
      };
    } else {
      currentInvoice = allInvoices.find((inv) => inv.id === invoiceId && inv.customerId === parseInt(customerId, 10));
    }

    if (currentInvoice) {
      setInvoice(currentInvoice);
      const customerData = getCustomerById(currentInvoice.customerId);
      setCustomer(customerData);
    } else {
      setInvoice(null);
      setCustomer(null);
    }
    setLoading(false);
  }, [invoiceId, customerId]);

  const updateInvoice = useCallback((updatedData) => {
    setInvoice((prev) => {
      if (!prev) return null;
      const newInvoice = { ...prev, ...updatedData };
      // Recalculate totals
      const subtotal = newInvoice.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
      const tax = subtotal * 0.1; // Example tax rate
      const total = subtotal + tax;
      const balanceDue = total - newInvoice.amountPaid;
      return { ...newInvoice, subtotal, tax, total, balanceDue };
    });
  }, []);

  const saveInvoice = useCallback(() => {
    if (!invoice) return;
    const allInvoices = getInvoices();
    const existingIndex = allInvoices.findIndex((inv) => inv.id === invoice.id);

    if (existingIndex > -1) {
      allInvoices[existingIndex] = invoice;
    } else {
      allInvoices.push(invoice);
    }
    saveInvoices(allInvoices);
  }, [invoice]);

  const addLineItem = useCallback(
    (item) => {
      if (!invoice) return;
      updateInvoice({ items: [...invoice.items, { ...item, id: new Date().getTime() }] });
    },
    [invoice, updateInvoice]
  );

  const updateLineItem = useCallback(
    (updatedItem) => {
      if (!invoice) return;
      updateInvoice({
        items: invoice.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      });
    },
    [invoice, updateInvoice]
  );

  const removeLineItem = useCallback(
    (itemId) => {
      if (!invoice) return;
      updateInvoice({ items: invoice.items.filter((item) => item.id !== itemId) });
    },
    [invoice, updateInvoice]
  );

  const handleSaveAndExit = () => {
    saveInvoice();
    navigate(`/customers/${customerId}/invoices`);
  };

  const handleFieldChange = (field, value) => {
    updateInvoice({ [field]: value });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  };

  const formatAddress = (address) => {
    if (!address) return 'No address on file.';
    return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
  };

  const handleCancel = () => navigate(`/customers/${customerId}/invoices`);

  return {
    invoice,
    customer,
    loading,
    updateInvoice,
    saveInvoice,
    addLineItem,
    updateLineItem,
    removeLineItem,
    handleSaveAndExit,
    handleFieldChange,
    formatCurrency,
    formatAddress,
    handleCancel,
  };
};

export default useInvoice;

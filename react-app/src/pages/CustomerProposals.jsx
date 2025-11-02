import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { addProposal, updateProposal, deleteProposal } from "../utils/localStorage";
import useAddEditProposal from "../hooks/useAddEditProposal";
import AddEditProposalModal from "../components/CustomerActions/AddEditProposalModal";
import useCustomerData from "../hooks/useCustomerData";
import { usePageSubHeader } from "../contexts/PageSubHeaderContext";
import useCustomerProposals from "../hooks/useCustomerProposals";
import useTableSearch from "../components/Common/SearchBar/useTableSearch";
import { useDataTable } from "../components/Common/DataTable";
import DataTable from "../components/Common/DataTable/DataTable";
import TableSearch from "../components/Common/SearchBar/TableSearch";
import AddNewButton from "../components/Common/AddNewButton";

const CustomerProposals = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id } = useParams();
  const { customer } = useCustomerData(id);
  const { proposals, refresh: refreshProposals } = useCustomerProposals(id);
  const proposalModal = useAddEditProposal(parseInt(id));

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(
    proposals,
    ['proposalTitle', 'proposalNumber', 'status']
  );

  const {
    data: paginatedData,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems
  } = useDataTable(filteredItems, {
    defaultSortField: 'createdAt',
    defaultSortDirection: 'desc',
    pageSize: 10
  });

  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: "Proposals",
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${id}` },
          { label: 'Proposals' }
        ]
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, id]);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'badge-soft-success';
      case 'Sent':
        return 'badge-soft-primary';
      case 'Draft':
        return 'badge-soft-secondary';
      case 'Rejected':
        return 'badge-soft-danger';
      case 'Withdrawn':
        return 'badge-soft-warning';
      default:
        return 'badge-soft-secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleDeleteProposal = (proposalId) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      deleteProposal(proposalId);
      refreshProposals();
    }
  };

  const columns = [
    'Proposal #',
    'Title',
    'Pricing',
    'Created Date',
    'Status',
    'Actions',
  ];

  const sortableColumns = {
    'Proposal #': 'proposalNumber',
    'Title': 'proposalTitle',
    'Created Date': 'createdAt',
    'Status': 'status'
  };

  const renderRow = (proposal) => (
    <tr key={proposal.id}>
      <td>
        <span className="fw-bold">{proposal.proposalNumber}</span>
      </td>
      <td>{proposal.proposalTitle}</td>
      <td>
        <div className="text-truncate" style={{ maxWidth: '200px' }}>
          {proposal.pricing}
        </div>
      </td>
      <td>{formatDate(proposal.createdAt)}</td>
      <td>
        <span className={`badge ${getStatusBadgeClass(proposal.status)}`}>
          {proposal.status}
        </span>
      </td>
      <td>
        <div className="d-flex gap-3">
          <a
            href="#"
            className="text-primary"
            title="Edit"
            onClick={(e) => {
              e.preventDefault();
              proposalModal.open(proposal);
            }}
          >
            <i className="mdi mdi-pencil font-size-18"></i>
          </a>
          <a
            href="#"
            className="text-danger"
            title="Delete"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteProposal(proposal.id);
            }}
          >
            <i className="mdi mdi-delete font-size-18"></i>
          </a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                    <div className="flex-grow-1 w-100 me-md-3">
                      <TableSearch
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search proposals..."
                      />
                    </div>
                    <div className="mt-2 mt-md-0">
                      <AddNewButton handleAddNew={() => proposalModal.open()} />
                    </div>
                  </div>
                </div>
              </div>

              <DataTable
                columns={columns}
                data={paginatedData}
                renderRow={renderRow}
                sortableColumns={sortableColumns}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                pagination={{
                  currentPage,
                  totalPages,
                  onPageChange: setCurrentPage,
                  totalItems
                }}
                emptyState={{
                  icon: 'mdi mdi-file-document-outline',
                  message: 'No proposals found',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AddEditProposalModal
        isOpen={proposalModal.isOpen}
        formData={proposalModal.formData}
        errors={proposalModal.errors}
        isSaving={proposalModal.isSaving}
        onUpdateField={proposalModal.onUpdateFieldHandle}
        onClose={proposalModal.close}
        onSave={() =>
          proposalModal.onSaveHandle(async (data) => {
            if (data.id) {
              updateProposal(data.id, data);
            } else {
              addProposal(data);
            }
            refreshProposals();
          })
        }
        onFileUpload={proposalModal.handleFileUpload}
        onRemoveAttachment={proposalModal.removeAttachment}
      />
    </>
  );
};

export default CustomerProposals;

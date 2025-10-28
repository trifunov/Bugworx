import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProposals, getAccounts, addProposal, updateProposal, deleteProposal } from '../utils/localStorage';
import useAddEditProposal from '../hooks/useAddEditProposal';
import AddEditProposalModal from '../components/AccountActions/AddEditProposalModal';
import AddNewButton from '../components/CustomerDetails/AddNewButton';

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const proposalModal = useAddEditProposal();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProposals(getProposals());
    setAccounts(getAccounts());
  };

  const getAccountName = (customerId) => {
    const account = accounts.find(a => a.id === customerId);
    return account ? account.name : 'N/A';
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch =
      proposal.proposalTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.proposalNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getAccountName(proposal.customerId).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  const handleSaveProposal = async (formData) => {
    try {
      if (formData.id) {
        updateProposal(formData.id, formData);
      } else {
        addProposal(formData);
      }
      loadData();
    } catch (error) {
      throw new Error('Failed to save proposal', error);
    }
  };

  const handleEditProposal = (proposal) => {
    proposalModal.open(proposal);
  };

  const handleDeleteProposal = (id) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      deleteProposal(id);
      loadData();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Proposals</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/">Bugworx</Link></li>
                <li className="breadcrumb-item active">Proposals</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                    <div className="d-flex gap-2 flex-grow-1 w-100 me-md-3">
                      <div className="flex-grow-1 position-relative">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search proposals..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoComplete="off"
                        />
                        <i className="bx bx-search-alt search-icon"></i>
                      </div>
                      <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ width: 'auto', minWidth: '150px' }}
                      >
                        <option value="all">All Status</option>
                        <option value="Draft">Draft</option>
                        <option value="Sent">Sent</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Withdrawn">Withdrawn</option>
                      </select>
                    </div>

                    <div className="mt-2 mt-md-0">
                      <AddNewButton handleAddNew={() => proposalModal.open()} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Proposal #</th>
                      <th>Customer</th>
                      <th>Title</th>
                      <th>Pricing</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProposals.map((proposal) => (
                      <tr key={proposal.id}>
                        <td>
                          <span className="fw-bold">{proposal.proposalNumber}</span>
                        </td>
                        <td>
                          <h5 className="font-size-14 mb-0">
                            {getAccountName(proposal.customerId)}
                          </h5>
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
                                handleEditProposal(proposal);
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
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProposals.length === 0 && (
                <div className="text-center py-4">
                  <i className="mdi mdi-file-document-outline font-size-48 text-muted"></i>
                  <p className="text-muted mt-2">No proposals found</p>
                </div>
              )}
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
        onSave={() => proposalModal.onSaveHandle(handleSaveProposal)}
        onFileUpload={proposalModal.handleFileUpload}
        onRemoveAttachment={proposalModal.removeAttachment}
      />
    </>
  );
};

export default Proposals;

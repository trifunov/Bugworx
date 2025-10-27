import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { accounts } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import useSidebar from '../hooks/useSidebar';
import useConfigurationSidebar from '../hooks/useConfigurationSidebar';

const Header = () => {
  const navigate = useNavigate();
  const { showSidebar, toggleSidebar } = useSidebar();
  const { showConfigurationSidebar } = useConfigurationSidebar();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);


  useEffect(() => {
    // Initialize Waves effect on header buttons
    if (window.Waves) {
      window.Waves.init();
    }

    // Handle fullscreen toggle
    const fullscreenBtn = document.querySelector('[data-toggle="fullscreen"]');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (
          !document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
        ) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/accounts?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearchDropdown(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = accounts
        .filter(
          (account) =>
            account.name.toLowerCase().includes(query.toLowerCase()) ||
            account.accountNum.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  const handleCustomerSelect = (accountId) => {
    navigate(`/accounts/${accountId}`);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          {/* LOGO */}
          <div className="navbar-brand-box">
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src="/assets/images/logo-sm.png" alt="logo-sm" height="22" />
              </span>
              <span className="logo-lg">
                <img src="/assets/images/logo-dark.png" alt="logo-dark" height="20" />
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img src="/assets/images/logo-sm.png" alt="logo-sm-light" height="22" />
              </span>
              <span className="logo-lg">
                <img src="/assets/images/logo-light.png" alt="logo-light" height="20" />
              </span>
            </Link>
          </div>

          {(showSidebar || showConfigurationSidebar) && (
            <button type="button" className="btn btn-sm px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn" onClick={toggleSidebar}>
              <i className="ri-menu-2-line align-middle"></i>
            </button>
          )}

          {/* App Search */}
          <form className="app-search d-none d-lg-block" onSubmit={handleSearch}>
            <div className="position-relative">
              <input
                type="text"
                name="searchQuery"
                className="form-control"
                placeholder="Search customer..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchResults.length > 0 && setShowSearchDropdown(true)}
                autoComplete="off"
              />
              <span className="ri-search-line"></span>

              {/* Search Results Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="dropdown-menu dropdown-menu-lg show" style={{ width: '100%', marginTop: '8px' }}>
                  {searchResults.map((account) => (
                    <a
                      key={account.id}
                      href="#"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCustomerSelect(account.id);
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <h6 className="mb-0">{account.name}</h6>
                          <p className="text-muted mb-0 font-size-12">{account.accountNum}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                  <div className="dropdown-divider"></div>
                  <a
                    href="#"
                    className="dropdown-item text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        navigate(`/accounts?q=${encodeURIComponent(searchQuery)}`);
                        setSearchQuery('');
                        setShowSearchDropdown(false);
                      }
                    }}
                  >
                    View all results
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="d-flex">
          <div className="dropdown d-inline-block d-lg-none ms-2">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              id="page-header-search-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="ri-search-line"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
              <form className="p-3" onSubmit={handleSearch}>
                <div className="mb-3 m-0">
                  <div className="input-group">
                    <input
                      type="text"
                      name="searchQuery"
                      className="form-control"
                      placeholder="Search customer..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      autoComplete="off"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        <i className="ri-search-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="dropdown d-none d-lg-inline-block ms-1">
            <Link to="/scheduler" className="btn header-item noti-icon waves-effect d-flex align-items-center">
              <i className="mdi mdi-calendar-multiselect me-1"></i>
              <span>Scheduler</span>
            </Link>
          </div>

          <div className="dropdown d-inline-block d-lg-none ms-1">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              onClick={() => navigate('/scheduler')}
            >
              <i className="mdi mdi-calendar-multiselect"></i>
            </button>
          </div>

          <div className="dropdown d-none d-lg-inline-block ms-1">
            <Link to="/routing" className="btn header-item noti-icon waves-effect d-flex align-items-center">
              <i className="mdi mdi-map-marker me-1"></i>
              <span>Routing & Fleet</span>
            </Link>
          </div>

          <div className="dropdown d-inline-block d-lg-none ms-1">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              onClick={() => navigate('/routing')}
            >
              <i className="mdi mdi-map-marker"></i>
            </button>
          </div>

          <div className="dropdown d-none d-lg-inline-block ms-1">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect d-flex align-items-center"
              id="page-header-add-new-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="mdi mdi-plus me-1"></i>
              <span>Add New</span>
            </button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="page-header-add-new-dropdown">
              <a className="dropdown-item" href="#"><i className="mdi mdi-account-convert me-2"></i>Lead</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-account-question-outline me-2"></i>Prospect</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-calculator me-2"></i>Estimate</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-file-document-edit me-2"></i>Proposal</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-account-plus me-2"></i>Customer</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-calendar-edit me-2"></i>Service</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-receipt me-2"></i>Invoice</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-cash me-2"></i>Payment</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-file-document-outline me-2"></i>Document</a>
            </div>
          </div>

          <div className="dropdown d-inline-block d-lg-none ms-1">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              id="page-header-add-new-dropdown-mobile"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="mdi mdi-plus"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="page-header-add-new-dropdown-mobile">
              <a className="dropdown-item" href="#"><i className="mdi mdi-account-convert me-2"></i>New Lead</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-account-question-outline me-2"></i>New Prospect</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-calculator me-2"></i>New Estimate</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-file-document-edit me-2"></i>New Proposal</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-account-plus me-2"></i>New Customer</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-calendar-edit me-2"></i>New Service</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-receipt me-2"></i>New Invoice</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-cash me-2"></i>New Payment</a>
              <a className="dropdown-item" href="#"><i className="mdi mdi-file-document-outline me-2"></i>New Document</a>
            </div>
          </div>

          <div className="dropdown d-none d-lg-inline-block ms-1">
            <button type="button" className="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
              <i className="ri-fullscreen-line"></i>
            </button>
          </div>

          <div className="dropdown d-inline-block">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              id="page-header-notifications-dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="ri-notification-3-line"></i>
              <span className="noti-dot"></span>
            </button>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
              <div className="p-3">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="m-0">Notifications</h6>
                  </div>
                  <div className="col-auto">
                    <a href="#!" className="small">View All</a>
                  </div>
                </div>
              </div>
              <div data-simplebar style={{ maxHeight: '230px' }}>
                <a href="#" className="text-reset notification-item">
                  <div className="d-flex">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <i className="ri-calendar-line"></i>
                      </span>
                    </div>
                    <div className="flex-1">
                      <h6 className="mb-1">New appointment scheduled</h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">Service scheduled for tomorrow at 10:00 AM</p>
                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 10 min ago</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="p-2 border-top">
                <div className="d-grid">
                  <a className="btn btn-sm btn-link font-size-14 text-center" href="#!">
                    <i className="mdi mdi-arrow-right-circle me-1"></i> View More..
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown d-inline-block user-dropdown">
            <button
              type="button"
              className="btn header-item waves-effect"
              id="page-header-user-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="rounded-circle header-profile-user"
                src={user?.avatar || '/assets/images/users/avatar-1.jpg'}
                alt={user?.name || 'User'}
              />
              <span className="d-none d-xl-inline-block ms-1">{user?.name?.split(' ')[0] || 'User'}</span>
              <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end">
              <div className="dropdown-header noti-title">
                <h6 className="text-overflow m-0">{user?.name}</h6>
                <span className="text-muted font-size-12">{user?.role}</span>
              </div>
              <a className="dropdown-item" href="#"><i className="ri-user-line align-middle me-1"></i> Profile</a>
              <a className="dropdown-item" href="#"><i className="ri-settings-2-line align-middle me-1"></i> Settings</a>
              <a className="dropdown-item" href="#"><i className="ri-lock-unlock-line align-middle me-1"></i> Lock screen</a>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                <i className="ri-shut-down-line align-middle me-1 text-danger"></i> Logout
              </button>
            </div>
          </div>

          <div className="dropdown d-inline-block">
            <button type="button" className="btn header-item noti-icon right-bar-toggle waves-effect">
              <i className="ri-settings-2-line"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

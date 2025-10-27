import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Carousel slides
  const slides = [
    {
      title: "Complete Pest Management Solution",
      subtitle: "Streamline your pest control operations with our all-in-one platform",
      features: [
        "Smart Scheduling & Routing",
        "Real-time Tracking",
        "Customer Management",
        "Inventory Control"
      ],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "AI-Powered Route Optimization",
      subtitle: "Save time and fuel with intelligent route planning",
      features: [
        "3 Optimization Strategies",
        "Real-time Updates",
        "Google Maps Integration",
        "Fuel Cost Tracking"
      ],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <div className="row g-0" style={{ minHeight: '100vh' }}>
        {/* Left Side - Carousel */}
        <div className="col-lg-7 d-none d-lg-block position-relative" style={{
          background: slides[currentSlide].gradient,
          transition: 'background 1s ease-in-out'
        }}>
          <div className="d-flex flex-column justify-content-center align-items-center h-100 p-5 text-white position-relative" style={{ zIndex: 2 }}>
            {/* Logo */}
            <div className="position-absolute top-0 start-0 p-4">
              <h2 className="text-white mb-0">
                <i className="mdi mdi-bug"></i> Bugworx
              </h2>
            </div>

            {/* Carousel Content */}
            <div className="text-center" style={{ maxWidth: '600px' }}>
              <div key={currentSlide} style={{
                animation: 'fadeInUp 0.8s ease-in-out'
              }}>
                <h1 className="display-4 fw-bold mb-4">{slides[currentSlide].title}</h1>
                <p className="lead mb-5 opacity-90">{slides[currentSlide].subtitle}</p>

                <div className="row g-3 mb-5">
                  {slides[currentSlide].features.map((feature, idx) => (
                    <div key={idx} className="col-6">
                      <div className="bg-white bg-opacity-10 rounded p-3 backdrop-blur">
                        <i className="mdi mdi-check-circle text-white fs-4 mb-2 d-block"></i>
                        <p className="mb-0 small">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="d-flex justify-content-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`carousel-indicator ${currentSlide === idx ? 'active' : ''}`}
                    style={{
                      width: currentSlide === idx ? '40px' : '12px',
                      height: '12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: currentSlide === idx ? 'white' : 'rgba(255,255,255,0.4)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Info */}
            <div className="position-absolute bottom-0 start-0 p-4 w-100">
              <div className="d-flex justify-content-between align-items-center text-white-50 small">
                <span>© 2024 Bugworx. All rights reserved.</span>
                <span>Pest Management System</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-lg-5 d-flex align-items-center justify-content-center bg-white">
          <div className="w-100 p-4 p-lg-5" style={{ maxWidth: '480px' }}>
            {/* Mobile Logo */}
            <div className="text-center mb-4 d-lg-none">
              <h2 className="text-primary mb-0">
                <i className="mdi mdi-bug"></i> Bugworx
              </h2>
              <p className="text-muted small">Pest Management System</p>
            </div>

            <div className="mb-4">
              <h3 className="fw-bold mb-2">Welcome Back!</h3>
              <p className="text-muted">Please login to your account</p>
            </div>

            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="mdi mdi-alert-circle-outline me-2"></i>
                {error}
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold">Username</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="mdi mdi-account-outline"></i>
                  </span>
                  <input
                    id="username"
                    className="form-control border-start-0 ps-0"
                    type="text"
                    required
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="mdi mdi-lock-outline"></i>
                  </span>
                  <input
                    id="password"
                    className="form-control border-start-0 ps-0"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-primary text-decoration-none small">Forgot password?</a>
              </div>

              <button
                className="btn btn-primary w-100 py-2 mb-3"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="mdi mdi-login me-1"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .backdrop-blur {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .input-group-text {
          background-color: #f8f9fa;
        }

        .form-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
          border-color: #667eea;
        }

        @media (max-width: 991.98px) {
          .row.g-0 {
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;

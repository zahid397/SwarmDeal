import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 🔥 Production ready logging
    console.error('🔥 ErrorBoundary caught:', error, errorInfo);

    // Future: send to Sentry / LogRocket
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.wrapper}>
          <h2 style={styles.title}>⚠️ Something went wrong</h2>
          <p style={styles.text}>
            Don’t worry — this is not your fault.  
            Please refresh the page or try again.
          </p>

          <button onClick={this.handleReload} style={styles.button}>
            🔄 Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#020617',
    color: '#e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  text: {
    fontSize: '0.95rem',
    opacity: 0.8,
    marginBottom: '1.5rem',
    maxWidth: '420px',
  },
  button: {
    padding: '10px 18px',
    background: '#2563eb',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default ErrorBoundary;

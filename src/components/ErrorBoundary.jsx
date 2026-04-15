import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      resetKey: 0 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.group("🚨 ErrorBoundary је ухватио грешку!");
    console.error("Разлог пуцања:", error);
    console.error("Детаљна React путања (Stack):", errorInfo.componentStack);
    console.groupEnd();
  }

  handleRetry = () => {
    this.setState((prevState) => ({
      hasError: false,
      error: null,
      resetKey: prevState.resetKey + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      const poruka = this.props.customMessage || "3D приказ тренутно није доступан 🚜";

      return (
        <div className="w-full h-48 md:h-64 bg-slate-100 rounded-3xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center mb-8">
          <p className="text-slate-500 font-bold mb-2">{poruka}</p>
          <button
            onClick={this.handleRetry}
            className="text-sm bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-200 transition-colors"
          >
            Освежи приказ
          </button>
        </div>
      );
    }

    return <React.Fragment key={this.state.resetKey}>{this.props.children}</React.Fragment>;
  }
}

export default ErrorBoundary;
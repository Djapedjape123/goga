import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Када се деси грешка у 3D моделу, пребацујемо state да прикажемо резервни UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Овде можемо да логујемо грешку у конзолу да клијент не види бели екран
    console.error("Ухваћена грешка при учитавању 3D модела:", error);
  }

  render() {
    if (this.state.hasError) {
      // Ово се приказује УМЕСТО 3D модела ако пукне интернет
      return (
        <div className="w-full h-48 md:h-64 bg-slate-100 rounded-3xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center mb-8">
          <p className="text-slate-500 font-bold mb-2">3D приказ тренутно није доступан 🚜</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-sm bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-200 transition-colors"
          >
            Освежи приказ
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
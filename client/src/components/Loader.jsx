const Loader = ({
  size = 'medium',
  text = '',
  fullScreen = false
}) => {
  const sizes = {
    small: 'w-5 h-5 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-cream/90 z-50'
    : 'flex flex-col items-center justify-center p-4';

  return (
    <div className={containerClasses} role="status">
      <div className="relative">
        {/* Spinner principale */}
        <div
          className={`${sizes[size]} border-forest/15 border-t-forest rounded-full animate-spin`}
        />
      </div>

      {text ? (
        <p className="mt-4 text-stone text-sm font-medium">
          {text}
        </p>
      ) : (
        <span className="sr-only">Caricamento</span>
      )}
    </div>
  );
};

export default Loader;

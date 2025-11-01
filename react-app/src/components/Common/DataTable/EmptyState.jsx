const EmptyState = ({ icon, message }) => {
  return (
    <div className="text-center py-4">
      <i className={`${icon} font-size-48 text-muted`}></i>
      <p className="text-muted mt-2">{message}</p>
    </div>
  );
};

export default EmptyState;

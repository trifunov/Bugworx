// Single source of truth for the backend CustomerType enum
// (Softela.PestManagement.Domain.Enums.CustomerType): Residential = 1, Commercial = 2.
// The API serializes/deserializes this enum as an integer, so the form works with
// string labels for display but must send/receive numeric values over the wire.

export const CUSTOMER_TYPE = {
  Residential: 1,
  Commercial: 2,
};

const CUSTOMER_TYPE_LABELS = Object.fromEntries(
  Object.entries(CUSTOMER_TYPE).map(([label, value]) => [value, label])
);

// API value (number) -> form label (string). Falls back to a passed-through
// string (already a label) or '' for unknown values.
export const customerTypeToLabel = (value) =>
  CUSTOMER_TYPE_LABELS[value] ?? (typeof value === 'string' ? value : '');

// Form label (string) -> API value (number), or null when unset/unknown.
export const customerTypeToApi = (label) => CUSTOMER_TYPE[label] ?? null;

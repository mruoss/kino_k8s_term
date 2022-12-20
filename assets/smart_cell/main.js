import "https://unpkg.com/react@18/umd/react.production.min.js";
import "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js";

const useAttrsState = (ctx, initialAttrs) => {
  const [attrs, setAttrs] = React.useState(initialAttrs);
  const updateAttr = (attrName) => (attrValue) => {
    ctx.pushEvent(`update_${attrName}`, attrValue);
  };

  React.useEffect(() => {
    ctx.handleEvent("update", (updates) => {
      setAttrs((attrs) => ({ ...Object.assign(attrs, updates) }));
    });
  }, []);
  return [attrs, updateAttr];
};

const Field = ({ name, label, children, className = "field grow" }) => (
  <div className={className} name={name}>
    <label className="input-label">{label}</label>
    {children}
  </div>
);

const Select = ({
  name,
  label,
  options,
  selectedOption,
  onChange,
  fieldClasses,
}) => (
  <Field name={name} label={label} className={fieldClasses}>
    <select
      name={name}
      className="input"
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option value={option.value} selected={option.value == selectedOption}>
          {option.label}
        </option>
      ))}
    </select>
  </Field>
);

const Input = ({ name, label, value, onChange, fieldClasses }) => {
  return (
    <Field name={name} label={label} className={fieldClasses}>
      <input
        name={name}
        value={value}
        className="input"
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
};

const Checkbox = ({ name, label, value, checked, onChange }) => (
  <Field name={name} label={label} className={"root-field"}>
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  </Field>
);

const App = ({ ctx, initialAttrs }) => {
  const [attrs, updateAttr] = useAttrsState(ctx, initialAttrs);
  return (
    <div className="app">
      <form>
        <div className="container">
          <div className="root">
            <Input
              name="config_path"
              value={attrs.config_path}
              label="Path to K8s Config"
              fieldClasses="root-field"
              onChange={updateAttr("config_path")}
            />
            <Select
              name="context"
              label="Context"
              options={attrs.contexts.map((context) => ({
                label: context,
                value: context,
              }))}
              selectedOption={attrs.context}
              fieldClasses="root-field"
              onChange={updateAttr("context")}
            />
            <Checkbox
              name="skip_tls_verify"
              label="Insecure Skip TLS Verification"
              checked={attrs.skip_tls_verify}
              value="skip"
              onChange={updateAttr("skip_tls_verify")}
            />
          </div>
          <div className="body">
            <div className="row">
              <Select
                name="namespace"
                label="Namespace"
                options={attrs.namespaces.map((ns) => ({
                  label: ns,
                  value: ns,
                }))}
                selectedOption={attrs.namespace}
                onChange={updateAttr("namespace")}
              />
              <Select
                name="pod"
                label="Pod"
                options={attrs.pods.map((pod) => ({ label: pod, value: pod }))}
                selectedOption={attrs.pod}
                onChange={updateAttr("pod")}
              />
              <Select
                name="container"
                label="Container"
                options={attrs.containers.map((cont) => ({
                  label: cont,
                  value: cont,
                }))}
                selectedOption={attrs.container}
                onChange={updateAttr("container")}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export function init(ctx, attrs) {
  ctx.importCSS("main.css");
  ctx.importCSS(
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
  );

  const root = ReactDOM.createRoot(ctx.root);
  root.render(<App ctx={ctx} initialAttrs={attrs} />);
}
